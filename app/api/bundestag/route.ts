import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://search.dip.bundestag.de/api/v1';
const API_KEY = 'I9FKdCn.hbfefNWCY336dL6x62vfwNKpoN2RZ1gp21';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');
  const params = Object.fromEntries(searchParams.entries());
  delete params.endpoint;

  const url = new URL(`${API_BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `ApiKey ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

