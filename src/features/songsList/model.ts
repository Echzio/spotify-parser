import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { api } from '@/shared/api';

const useSongs = (spotify: SpotifyWebApi.SpotifyWebApiJs) => {
  const [songs, setSongs] = useState<SpotifyApi.UsersSavedTracksResponse>({} as SpotifyApi.UsersSavedTracksResponse);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    api.getAllSavedTracks(
      spotify,
      response => {
        setSongs(response);
      },
      success => setComplete(success),
    );
  }, [spotify]);

  return { songs, complete };
};

const useVirtual = (count: number, visibleItems: number, height: number) => {
  const [virtualStart, setVirtualStart] = useState(0);

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      setVirtualStart(Math.min(count - visibleItems, Math.floor(target.scrollTop / height)));
    },
    [count, visibleItems, height],
  );

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

const useDownload = (songItems: SpotifyApi.SavedTrackObject[], complete: boolean) => {
  const link = useMemo(() => {
    if (!complete) return '';
    const list = songItems
      .map(({ track }) => {
        const artists = track.artists.map(({ name }) => name).join(', ');

        return `${artists} - ${track.name}`;
      })
      .join('\n');

    const blob = new Blob([list], { type: 'text/plain' });

    return URL.createObjectURL(blob);
  }, [complete, songItems]);

  return link;
};

export { useSongs, useVirtual, useDownload };
