import ItineraryEvent from "../../ItineraryEvent";
import {describe, test, expect, vi} from 'vitest'
import React from "react";
import {render, screen} from "@testing-library/react"
//import "@testing-library/jest-dom"


describe ('ItineraryEvent', () =>  {
    test('renders Itinerary Event component as expected', () => {
         const bookedDate = new Date(2023, 12, 20);
         //expect(1).toBe(1);
       render(
          <ItineraryEvent
            date={bookedDate}
            time={8}
            location="Pixar Pier"
            guestNumber={4}
          />
        );

        expect(screen.getByTestId("event-time").textContent).toEqual(
        " " + 8 + " AM "
        );
        expect(screen.getByTestId("event-location").textContent).toEqual(
          " Pixar Pier Reservation | "
        );
        expect(screen.getByTestId("guestNumber").textContent).toEqual(
        " 4 guests "
        );
    
});
})