export async function fetchFromAPI(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL('/api/bundestag', window.location.origin);
  url.searchParams.append('endpoint', endpoint);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

