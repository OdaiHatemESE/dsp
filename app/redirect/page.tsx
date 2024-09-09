'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/slices/authSlice';
import { AppDispatch } from '@/store'; // Assuming you have a typed store

const RedirectPage: React.FC = () => {
  const LoginURL = process.env.NEXT_PUBLIC_LOGIN_URL;
  const PortalURL = process.env.NEXT_PUBLIC_PORTAL_URL;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const hash = window.location.hash;
    const token = hash?.startsWith('#token=') ? hash.substring(7) : null;

    if (token) {
      try {
        // Dispatch the token to store
        dispatch(setToken(token));

        // Redirect to /parent after setting the token
        window.location.href = '/parent';
      } catch (error) {
        console.error('Error setting the token:', error);
        // Optionally, handle any errors such as showing an error message or redirecting
      }
    } else {
      // Safely encode URL to prevent XSS attacks
      const encodedRedirectURI = encodeURIComponent(`${PortalURL}/redirect`);
      window.location.href = `${LoginURL}?RedirectUri=${encodedRedirectURI}`;
    }
  }, [dispatch, LoginURL, PortalURL]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#212121eb]">
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin h-10 w-10 text-white mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="#fff"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="#fff"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <p className="text-lg text-white">Redirecting...</p>
      </div>
    </div>
  );
};

export default RedirectPage;
