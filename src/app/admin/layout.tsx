import { ReactNode } from 'react';
import './layout.css'; 

export default async function Layout({children}:{children:React.ReactNode}){ 

    return <div>{children}</div>
}
