'use server';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ReactNode } from 'react';
import './globals.css';

import OAuthProvider from './GoogleProvider';

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <OAuthProvider clientId={process.env.CLIENT_ID!}>
          {children}
        </OAuthProvider>
      </body>
    </html>
  );
}
