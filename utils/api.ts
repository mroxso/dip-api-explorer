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

export interface Person {
  id: string;
  nachname: string;
  vorname: string;
  namenszusatz?: string;
  typ: string;
  wahlperiode: number;
  basisdatum: string;
  datum: string;
  aktualisiert: string;
  titel: string;
  person_roles: PersonRole[];
}

export interface PersonRole {
  funktion: string;
  funktionszusatz?: string;
  fraktion?: string;
  nachname: string;
  vorname: string;
  namenszusatz?: string;
  wahlperiode_nummer: number[];
  wahlkreiszusatz?: string;
  ressort_titel?: string;
  bundesland?: string;
}

