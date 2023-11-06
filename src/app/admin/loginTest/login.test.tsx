import React from "react";
import { it, expect, test, describe } from "vitest"
import Page from "../login/page"; 
import { render } from "@testing-library/react";


describe('Admin Login Page', () => {

    test('admin login page renders', () => {
        const {container} = render(<Page />);
        expect(container).toMatchSnapshot();
    });


});