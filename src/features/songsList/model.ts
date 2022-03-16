import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { api } from '@/shared/api';

const useSongs = (spotify: SpotifyWebApi.SpotifyWebApiJs) => {
  const [songs, setSongs] = useState<SpotifyApi.UsersSavedTracksResponse>({} as SpotifyApi.UsersSavedTracksResponse);

  useEffect(() => {
    api.getAllSavedTracks(spotify, response => {
      setSongs(response);
    });
  }, [spotify]);

  return { songs };
};

const useVirtual = (count: number, visibleItems: number, height: number) => {
  const [virtualStart, setVirtualStart] = useState(0);

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    setVirtualStart(Math.min(count - visibleItems, Math.floor(target.scrollTop / height)));
  };

  const topHeight = `${virtualStart * height}px`;

  const bottomHeight = `${(count - virtualStart - visibleItems) * height}px`;

  const rootHeight = `${visibleItems * height}px`;

  return {
    onScroll,
    rootHeight,
    virtualStart,
    visibleItems,
    topHeight,
    bottomHeight,
  };
};

export { useSongs, useVirtual };
