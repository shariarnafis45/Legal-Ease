"use server";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const serverFetch = async (path) => {
  const res = await fetch(`${serverUrl}${path}`);
  return res.json();
};

export const serverMuting = async (path, data, operation = "POST") => {
  const res = await fetch(`${serverUrl}${path}`, {
    method: operation,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
