import UserInput from "@/components/Input";

import BayviewCalendar from "@/components/Input/BayviewCalendar";
import { ExperienceType, TExperienceType } from "@/types/Event";
import {
  faDollar,
  faDollarSign,
  faEuroSign,
  faPoundSign,
  faRupeeSign,
  faUserGroup,
  faYenSign
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { findEvents } from "../../EventFinder";
import { SearchableCard } from "../Searchable";
import { EventDropdown } from "./utils";
import { useHomepage } from "@/hooks";
import LocationInput from "@/components/Button/Location";

export const CurrencyIconMap = {
  $: faDollarSign,
  "€": faEuroSign,
  "£": faPoundSign,
  "¥": faYenSign,
  "₹": faRupeeSign
} as const;

type InputValidationProps = {
  initialValue: string;
  regexp: RegExp;
  min?: number;
  max?: number;
};

export const useInputValidation = ({
  initialValue,
  regexp,
  min,
  max
}: InputValidationProps) => {
  const [isValid, setValid] = useState(true);

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValid((v) => {
      let isValid = regexp.test(value);
      if (isValid) {
        if (min || min === 0) {
          isValid = parseInt(value, 10) >= min;
        }
        if (max) {
          isValid = parseInt(value, 10) <= max;
        }
      }
      return isValid;
    });
  }, [value, regexp, min, max]);

  return [value, isValid, setValue] as const;
};

export function ExperienceCard() {
  const { currency } = useHomepage().itinerary;

  const props = {
    title: "Experience",
    subtitle: "Search for a fun experience!",
    btnTxt: "Find Experience",
    handleSearch: async (form: FormData) => {
      console.log(form);
      return findEvents({
        activity: "Experience",
        type: type,
        params: {
          ...Object.fromEntries(form)
        }
      });
    }
  };

  const events = ExperienceType;

  const [type, setType] = useState(events[0] as TExperienceType);

  const [partySize, partyValid, setPartySize] = useInputValidation({
    initialValue: "0",
    regexp: /[0-9]+/,
    min: 0
  });

  const [priceRange, priceValid, setPriceRange] = useInputValidation({
    initialValue: "0",
    regexp: /[0-9]+/,
    min: 0
  });

  return (
    <>
      <SearchableCard {...props} disabled={!partyValid || !priceValid}>
        <div className="grid grid-cols-2 gap-4">
          <BayviewCalendar
            name="date"
            label="Date"
            placeholder="Date..."
          />
          <LocationInput />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <UserInput
            placeholder="Party Size..."
            name="partySize"
            label="Party Size"
            type="number"
            value={partySize}
            min={0}
            onChange={(e) => setPartySize(e.currentTarget.value)}
            icon={{ icon: faUserGroup }}
            required
          />
          <UserInput
            icon={{ icon: CurrencyIconMap[currency.symbol] }}
            type="number"
            name="priceRange"
            label="Max Price"
            value={priceRange}
            min={0}
            onChange={(e) => setPriceRange(e.currentTarget.value)}
            placeholder="Limit..."
            required
          />
          <EventDropdown
            className="mt-6"
            event={type}
            setEvent={setType}
            data={events}
          />
        </div>
      </SearchableCard>
    </>
  );
}
