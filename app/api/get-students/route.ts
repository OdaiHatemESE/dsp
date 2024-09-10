// app/api/odai/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url); // Extract query parameters
  const id = searchParams.get('id'); // Get the `id` parameter from the query string

  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  const username = process.env.BASIC_AUTH_USERNAME as string;
  const password = process.env.BASIC_AUTH_PASSWORD as string;

  const token = Buffer.from(`${username}:${password}`).toString('base64');

  try {
    const response = await fetch(`https://idh.ese.gov.ae/idhapi/api/PaShip/${id}`, {
      headers: {
        'Authorization': `Basic ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
