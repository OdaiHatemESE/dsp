// middleware.ts
// Importing NextResponse from next/server to handle server-side responses
import { NextResponse } from 'next/server';
// Importing NextRequest from next/server to handle server-side requests
import type { NextRequest } from 'next/server';
// Importing jwtDecode to decode JSON Web Tokens
import { jwtDecode } from 'jwt-decode';


// Middleware function to handle incoming requests
export async function middleware(req: NextRequest) {
  // Retrieving the authToken from cookies
  const token = req.cookies.get('authToken')?.value;
  const LoginURL = process.env.LoginURL ?? '';

  // Check if token exists
  if (token) {
    try {
      // Decode the token to get its payload
      const decodedToken: any = jwtDecode(token);
      // Get the current time in seconds
      const currentTime = Date.now() / 1000;

      // Check if the token is expired
      if (decodedToken.exp < currentTime) {
        // If the token is expired, redirect to the login URL with the current URL as a query parameter
        const url = new URL(LoginURL);
        url.searchParams.set('RedirectUri', req.nextUrl.href);
        return NextResponse.redirect(url);

      }

      
      

    } catch (error) {
      // Log an error if decoding the token fails
      console.error('Failed to decode token:', error);
      // Redirect to the login URL with the current URL as a query parameter in case of an error
      const url = new URL('https://uap-stg.ese.gov.ae/User/Login/ESE.EES');
      url.searchParams.set('RedirectUri', req.nextUrl.href);
      return NextResponse.redirect(url);
    }
  } else {
    // If no token is found and the pathname is not '/redirect', redirect to '/redirect'
    if (req.nextUrl.pathname !== '/redirect') {
      const url = req.nextUrl.clone();
      url.pathname = '/redirect';
      return NextResponse.redirect(url);
    }
  }

  // If the token is valid or no redirection is needed, proceed to the next middleware or request handler
  return NextResponse.next();
}

// Configuration object to define the matching patterns for the middleware
export const config = {
  // Matcher to apply the middleware to all paths except for those starting with 'api', '_next/static', '_next/image', and 'favicon.ico'
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
