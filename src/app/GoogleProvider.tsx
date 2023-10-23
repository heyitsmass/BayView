'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

type OAuthProviderProps = {
  clientId: string;
  children: React.ReactNode;
};

export default function OAuthProvider({ ...props }: OAuthProviderProps) {
  return <GoogleOAuthProvider {...props} />;
}
