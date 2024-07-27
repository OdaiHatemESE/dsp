'use client';

// pages/redirect.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/slices/authSlice';

export default function RedirectPage() {
  const LoginURL = process.env.LoginURL ?? '';
  const dispatch = useDispatch();
  //const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const token = hash && hash.startsWith('#token=') ? hash.substring(7) : null;

    if (token) {
      dispatch(setToken(token));
      window.location.href = '/';
      //   router.replace('/'); // Redirect to the home page after setting the token
    } else {
      window.location.href = LoginURL + '?RedirectUri=http://localhost:4200'
      // router.replace('/login'); // Redirect to login if no token is found
    }
  }, [dispatch]);

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

