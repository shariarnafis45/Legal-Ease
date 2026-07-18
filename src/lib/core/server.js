const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const serverFetch = async (path) => {
  const res = await fetch(`${serverUrl}${path}`);
  return res.json();
};
