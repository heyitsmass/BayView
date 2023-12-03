import ItineraryTitleDialog from "../../ItineraryTitleDialog";
import { describe, test, expect, vi } from "vitest";
import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
//import "@testing-library/jest-dom";


describe("ItineraryTitleDialog", () => {

    const testFun = {
        closeThis(bool) {

        }
    }
    
  test("renders Itinerary Title Dialog component as opened and the closed", async () => {

    const closeSpy = vi.spyOn(testFun, "closeThis");

    await render(<ItineraryTitleDialog open = {true} onClose = {() => {testFun.closeThis(true);}}/> );


    expect(screen.getByTestId("dialogTest").textContent).toEqual(
    " Select Location  Magical Land Magical World  Confirm "
    );

   await fireEvent.click(screen.getByTestId("closeButtonTest"));

    expect(closeSpy).toHaveBeenCalled();
    
  });
});
