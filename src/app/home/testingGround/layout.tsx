import { ReactNode } from 'react';
import '../layout.css';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="layout">{children}</div>;
}
