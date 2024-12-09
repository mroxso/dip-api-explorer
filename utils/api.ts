import NodeCache from 'node-cache';

// Initialize the cache with a default TTL of 5 minutes
const cache = new NodeCache({ stdTTL: 300 });

export async function fetchFromAPI(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL('/api/bundestag', typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
  url.searchParams.append('endpoint', endpoint);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const cacheKey = url.toString();
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  cache.set(cacheKey, data);

  return data;
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

export interface Activity {
  id: string;
  aktivitaetsart: string;
  typ: string;
  dokumentart: 'Drucksache' | 'Plenarprotokoll';
  wahlperiode: number;
  datum: string;
  aktualisiert: string;
  titel: string;
  fundstelle: Fundstelle;
  vorgangsbezug: VorgangspositionBezug[];
  vorgangsbezug_anzahl: number;
  deskriptor: Deskriptor[];
  abstract?: string;
}

export interface Fundstelle {
  id: string;
  dokumentart: 'Drucksache' | 'Plenarprotokoll';
  pdf_url: string;
  dokumentnummer: string;
  datum: string;
  herausgeber: string;
  seite?: string;
}

export interface VorgangspositionBezug {
  id: string;
  titel: string;
  vorgangstyp: string;
  vorgangsposition: string;
}

export interface Deskriptor {
  name: string;
  typ: string;
}

