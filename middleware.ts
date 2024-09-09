// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecode} from 'jwt-decode';

export async function middleware(req: NextRequest) {
  // Retrieving the authToken from cookies
  let token = req.cookies.get('authToken')?.value ?? '';

  const LoginURL = process.env.NEXT_PUBLIC_LOGIN_URL ?? '';

  // Check if token exists
  if (token) {
    try {
      // Decode the token to get its payload
      const decodedToken: any = jwtDecode(token);
      // Get the current time in seconds
      const currentTime = Date.now() / 1000;

      // Check if the token is expired
      if (decodedToken.exp < currentTime) {
        // Log the expired token
      

        // Create a response to delete the authToken cookie
        const response = NextResponse.redirect(LoginURL);
        
        // Remove the 'authToken' cookie
        response.cookies.set('authToken', '', { maxAge: -1 });

        // Append the redirect URI as a query parameter to the login URL
        const url = new URL(LoginURL);
        url.searchParams.set('RedirectUri', req.nextUrl.href);

        // Return the response to redirect the user
        return response;
      }
    } catch (error) {
      // Log an error if decoding the token fails
      

      // Redirect to the login URL with the current URL as a query parameter in case of an error
      const url = new URL(LoginURL);
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
