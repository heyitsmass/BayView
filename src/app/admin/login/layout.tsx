import { ReactNode } from "react";
import './layout.css';

export default async function Layout(
  {
    children
  }: {
    children: ReactNode
  }
) {

  return <div className='login'>{children}</div>

}