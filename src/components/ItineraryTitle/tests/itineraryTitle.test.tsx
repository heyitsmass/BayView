import ItineraryTitle from "../../ItineraryTitle";
import { describe, test, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("ItineraryTitle", () => {
  test("renders Itinerary Title component as expected", () => {
    render(
      <ItineraryTitle
      />
    );

    expect(screen.getByTestId("title-check").textContent).toEqual(
      "Itinerary Title Disneyland 10/4 - 10/5 "
    );

  });
});
 