import React from "react";
import { it, expect, test, describe } from "vitest"
import Layout from "../dashboard/layout"; 
import { render, screen, fireEvent } from "@testing-library/react";


describe('Layout Component', () => {
    test('Renders correctly with sections', () => {
      const {container} = render(<Layout />);
        expect(container).toMatchSnapshot();
    });
  });