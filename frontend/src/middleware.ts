import { NextRequest, NextResponse } from 'next/server';
import { APP_CONFIG } from './config';

export async function middleware(request: NextRequest) {
  const activationPaths = ['/signup', '/', '/chat'];
  const baseUrl = 'http://' + request.nextUrl.host;
  const { pathname } = request.nextUrl;

  const isPrivateRoute = pathname.startsWith('/chat');
  const isPublicRoute = pathname === '/' || pathname === '/signup';

  // Probably a better way to achieve the same result?
  if (!activationPaths.includes(pathname) && !pathname.startsWith('/chat')) {
    return NextResponse.next();
  }
  const hasToken = request.cookies.get(APP_CONFIG.ACCESS_TOKEN);
  if (hasToken && hasToken.value && hasToken.name) {
    if (isPublicRoute) {
      return NextResponse.redirect(`${baseUrl}/chat`);
    }

    // Axios doesn't work on this context
    const response = await fetch(
      (process.env.NEXT_PUBLIC_API_URL + '/users/me') as string,
      {
        headers: {
          Authorization: `Bearer ${hasToken.value}`,
        },
        method: 'GET',
      }
    );
    const isValidToken = await response.json();
    if (!isValidToken) {
      return NextResponse.redirect(`${baseUrl}/`);
    }
    const userData = new Headers(request.headers);
    userData.set('X-User', JSON.stringify(isValidToken));
    if (pathname.includes('/chat/')) {
      const doesRoomExist = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/${
          pathname.split('/')[2]
        }` as string,
        {
          headers: {
            Authorization: `Bearer ${hasToken?.value}`,
          },
          method: 'GET',
        }
      );
      if (doesRoomExist.ok) {
        return NextResponse.next({
          headers: userData,
        });
      }
      return NextResponse.redirect(`${baseUrl}/chat`, {
        headers: userData,
      });
    }
    return NextResponse.next({
      headers: userData,
    });
  } else {
    if (isPrivateRoute) {
      return NextResponse.redirect(`${baseUrl}/`);
    }
    return NextResponse.next();
  }
}
