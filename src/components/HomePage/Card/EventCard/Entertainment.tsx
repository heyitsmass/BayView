'use client';
import LocationInput from "@/components/Button/Location";
import UserInput from "@/components/Input";
import BayviewCalendar from "@/components/Input/BayviewCalendar";
import { ScrollableDropdown } from "@/components/Settings/components/Dropdowns";
import {
  EntertainmentType,
  SeatType,
  TEntertainmentType,
  TSportEvent,
  TheatreSeatType
} from "@/types/Event";
import {
  faArchway,
  faBuilding,
  faChild,
  faDollar,
  faGuitar,
  faHome,
  faMasksTheater,
  faMicrophone,
  faPerson,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { findEvents } from "../../EventFinder";
import {
  Atmosphere,
  DressCode,
  Music,
  Sales,
  SportType
} from "../../EventFinder/constants";
import { SearchableCard } from "../Searchable";
import { EventDropdown } from "./utils";

export function EntertainmentCard<S extends TSportEvent>() {
  const props = {
    title: "Entertainment",
    subtitle: "Search for something entertaining!",
    btnTxt: "Find Event",
    handleSearch: async (form: FormData) => {
      console.log(form);
      return findEvents({
        activity: "Entertainment",
        type: type,
        subtype: type === "Sports" ? (form.get("subtype") as S) : undefined,
        params: {
          ...Object.fromEntries(form)
        }
      });
    }
  };
  const events = EntertainmentType;

  const [type, setType] = useState(events[0] as TEntertainmentType);

  const [sportType, setSportType] = useState(SportType[0] as S);
  const [dressCode, setDressCode] = useState(DressCode[0]);
  const [music, setMusic] = useState(Music[0]);
  const [currentSale, setSales] = useState(Sales[0]);
  const [atmosphere, setAtmosphere] = useState(Atmosphere[0]);
  const [seatType, setSeatType] = useState(SeatType[0]);
  const [theatreSeatType, setTheatreSeatType] = useState(
    TheatreSeatType[0]
  );

  return (
    <>
      <SearchableCard {...props}>
        <div className="grid grid-cols-2 gap-4">
          <BayviewCalendar name="date" label="Date" placeholder="Date..." />
          {type === "Sports" && (
            <UserInput
              name="event"
              label="Event"
              type="text"
              placeholder="Event..."
              icon={{ icon: faBuilding }}
            />
          )}
          {(type === "Nightlife" || type === "Shopping") && (
            <LocationInput
              name="location"
              label="Location"
              type="text"
              placeholder="Location..."
            />
          )}
          {type === "Theatre" && (
            <UserInput
              name="play"
              label="Play"
              type="text"
              placeholder="Play..."
              icon={{ icon: faMasksTheater }}
            />
          )}
          {type === "Concert" && (
            <UserInput
              name="artist"
              label="Artist"
              type="text"
              placeholder="Artist..."
              icon={{ icon: faMicrophone }}
            />
          )}
        </div>
        {type === "Theatre" && (
          <>
            <UserInput
              name="playwright"
              label="Playwright"
              type="text"
              placeholder="Playwright..."
              icon={{ icon: faUser }}
            />
          </>
        )}
        {type === "Concert" && (
          <>
            <UserInput
              name="concert"
              label="Concert"
              type="text"
              placeholder="Concert..."
              icon={{ icon: faGuitar }}
            />
          </>
        )}

        <div className="grid place-items-center grid-flow-col gap-4">
          {type !== "Shopping" && (
            <>
              <UserInput
                name="childCount"
                label="Children"
                type="number"
                placeholder="Children..."
                defaultValue="0"
                icon={{ icon: faChild }}
              ></UserInput>
              <UserInput
                name="adultCount"
                label="Adults"
                type="number"
                placeholder="Adults..."
                defaultValue="1"
                icon={{ icon: faPerson }}
              ></UserInput>
            </>
          )}
          <UserInput
            icon={{ icon: faDollar }}
            type="number"
            name="priceRange"
            label={type !== "Shopping" ? "Price" : "Budget"}
            placeholder={
              type !== "Shopping" ? "Price Limit..." : "Budget..."
            }
            min="0"
            defaultValue="0"
          />
        </div>
        {type === "Sports" && (
          <div className="grid grid-cols-2 gap-4">
            <UserInput
              name="home_team"
              label="Home Team"
              type="text"
              placeholder="Your favorite team"
              icon={{ icon: faHome }}
            ></UserInput>
            <UserInput
              name="away_team"
              label="Away Team"
              type="text"
              placeholder="Your rivals"
              icon={{ icon: faArchway }}
            ></UserInput>
          </div>
        )}

        {type === "Nightlife" && (
          <div className=" flex items-center gap-4">
            <div className="border flex rounded-3xl px-4 py-2 bg-zinc-700 border-zinc-600 shadow-md my-2 justify-between w-1/2 min-w-fit gap-4 relative z-0">
              <ScrollableDropdown
                data={DressCode}
                title="Dress Code Selection"
                btnName="Dress Code"
                curr={dressCode}
                onSubmit={setDressCode}
              />
              <ScrollableDropdown
                data={Music}
                title="Genre"
                btnName="Music"
                curr={music}
                onSubmit={setMusic}
              />
            </div>
            <UserInput
              name="age"
              label="Age Limit"
              type="number"
              placeholder="Age..."
              defaultValue="18"
              icon={{ icon: faUser }}
            />
          </div>
        )}

        <div className="border grid grid-cols-3 p-2 rounded-3xl bg-zinc-700 pl-4 border-zinc-600 shadow-md my-2 z-10">
          <div className="flex col-span-2 gap-2">
            {type === "Theatre" && (
              <ScrollableDropdown
                data={TheatreSeatType}
                btnName="Seat Type"
                title="Type Selection"
                onSubmit={setTheatreSeatType}
                curr={theatreSeatType}
              />
            )}

            {type === "Concert" && (
              <>
                <ScrollableDropdown
                  data={SeatType}
                  btnName="Seat"
                  title="Seat Selection"
                  curr={seatType}
                  onSubmit={setSeatType}
                />
                <ScrollableDropdown
                  data={Music}
                  btnName="Music"
                  title="Genre Selection"
                  onSubmit={setMusic}
                  curr={music}
                />
              </>
            )}
            {type === "Sports" && (
              <>
                <ScrollableDropdown
                  data={SeatType}
                  btnName="Seat Type"
                  title="Seating Type"
                  curr={seatType}
                  onSubmit={setSeatType}
                />

                <ScrollableDropdown
                  data={SportType}
                  btnName="Sport"
                  title="Sport Selection"
                  curr={sportType}
                  onSubmit={setSportType}
                />
              </>
            )}
            {type === "Nightlife" && (
              <>
                <ScrollableDropdown
                  data={Atmosphere}
                  btnName="Atmosphere"
                  title="Atmosphere Selection"
                  onSubmit={setAtmosphere}
                  curr={atmosphere}
                />
              </>
            )}
            {type === "Shopping" && (
              <ScrollableDropdown
                data={Sales}
                btnName="Sales"
                title="Sales Selection"
                onSubmit={setSales}
                curr={currentSale}
              />
            )}
          </div>

          <EventDropdown event={type} setEvent={setType} data={events} />
        </div>
      </SearchableCard>
    </>
  );
}
