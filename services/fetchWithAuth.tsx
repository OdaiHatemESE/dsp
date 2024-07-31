// customFetch.ts
import { parseCookies, setCookie, destroyCookie } from 'nookies'
let cookies =parseCookies();
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TOKEN = cookies.authToken;

const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
   
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${TOKEN}`,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response;
};

export default fetchWithAuth;