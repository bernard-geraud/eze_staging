import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import SSOService from './hooks/ezeSSO';

export async function middleware(request: NextRequest) {
  // Clone the current URL
  const url = request.nextUrl.clone();
  console.log('URL: ', url);

  console.log('First One');

  // Check if the request contains the 'access-token' cookie
  //   const accessTokenExist = request.cookies.get('user_data');
  const accessTokenExist = request.cookies.get('token');

  if (accessTokenExist) {
    console.log('Second One');
    return NextResponse.next();
  } else {
    console.log('Third One');

    // Check if the URL has the `access-token` parameter
    // const accessToken = url.searchParams.get('access-token'); // uncomment
    const accessToken = url.searchParams.get('token');
    console.log('Access Token ', accessToken);

    if (accessToken) {
      console.log('Fifth One');

      url.searchParams.delete('access-token');
      const cleanUrl = url.toString();

      const response = NextResponse.redirect(cleanUrl);

      const expires = new Date();
      console.log('Expires: ', expires);
      expires.setDate(expires.getDate() + 28);
      console.log('Date: ', expires);

      response.cookies.set('token', accessToken, {
        path: '/',
        httpOnly: false,
        sameSite: 'strict',
        expires: expires,
        secure: false,
      });

      //   const cookie = response.cookies.get('token'); //uncomment
      const cookie = response.cookies.get('token');
      console.log('COOKIE IS: ', cookie);
      return response;
    } else {
        console.log('AHHHHHHHHHHHHHHH');
        url.pathname = '/login';
        console.log('URL: ', url);
        return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ['/reset-password', '/profile', '/', '/communities'],
};
