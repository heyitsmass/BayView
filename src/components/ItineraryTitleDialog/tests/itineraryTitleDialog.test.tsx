import ItineraryTitleDialog from "../../ItineraryTitleDialog";
import { describe, test, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("ItineraryTitleDialog", () => {
  test("renders Itinerary Title Dialog component as expected", () => {
    render(<ItineraryTitleDialog {false } />);

    expect(screen.getByTestId("title-check").textContent).toEqual(
      "Itinerary Title Disneyland 10/4 - 10/5 "
    );
  });
});
