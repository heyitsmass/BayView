import ItineraryTitle from "../../ItineraryTitle";
import { describe, test, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
//import "@testing-library/jest-dom";

// Mock useHomepage and useHomepageManager hooks
vi.mock("@/hooks", () => ({
  useHomepage: () => ({
    itinerary: {
      location: "MockLocation ",
      events: [],
      title: "MockTitle "
    }
  }),
  useHomepageManager: () => vi.fn().mockResolvedValue({ /* mock response */ })
}));

describe("ItineraryTitle", () => {
  test("renders Itinerary Title component as expected", () => {
    render(
      <ItineraryTitle
      />
    );

    expect(screen.getByTestId("title-check").textContent).toEqual(
      "MockTitle MockLocation No Events!"
    );

  });
});
 