export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  if (res.status >= 400) throw new Error(res.statusText);

  return res.json();
}
