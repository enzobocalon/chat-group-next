import { APP_CONFIG } from '@/config';
import axios from 'axios';

const isServer = typeof window === 'undefined';
export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

function getChatTokenCookie() {
  const cookieName = APP_CONFIG.ACCESS_TOKEN + '=';
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      const encodedValue = cookie.substring(cookieName.length, cookie.length);
      return decodeURIComponent(encodedValue);
    }
  }

  return null;
}

httpClient.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import('next/headers');
    const accessToken = cookies().get(APP_CONFIG.ACCESS_TOKEN);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } else {
    const accessToken = getChatTokenCookie();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});
