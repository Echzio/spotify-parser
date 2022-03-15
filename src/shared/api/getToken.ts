const getToken = async (code: string) => {
  const body = Object.entries({
    redirect_uri: process.env.REDIRECT_URL,
    grant_type: 'authorization_code',
    code,
  })
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const response = await fetch(`https://accounts.spotify.com/api/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  }).then(res => res.json());

  return response;
};

export { getToken };
