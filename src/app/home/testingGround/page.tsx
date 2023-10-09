import { ReactNode } from "react";
const SomeNewPage = ({children}:{children:ReactNode}) => {
    return <>
        <h1> This is a test. testing</h1>
        {children}
    </>
}

export default SomeNewPage;