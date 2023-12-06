"use client";
import { AnimationComponent } from "@/components/Animations/AnimatePresenceComponent";
import Button from "@/components/Button";
import { useOpen } from "@/hooks";
import { timeZones } from "@/types";
import { Locale, locales } from "@/utils/openWeather/langText";
import { AnimatePresence } from "framer-motion";

import { ReactNode, useState } from "react";
import { useDropdownRef } from "../../hooks/useDropdownRef";
import { ScrollableData } from "../ScrollableData";

export const Dropdown = ({
  isOpen,
  data,
  current,
  title,
  ref,
  children,
  onClick
}: {
  isOpen: boolean;
  data?: readonly any[] | any[];
  current: any;
  title: string;
  children?: ReactNode;
  ref?: React.MutableRefObject<any>;
  onClick?: () => void;
}) => {
  return (
    <>
      {isOpen && (
        <div className="absolute overflow-hidden right-0 -top-5 mt-6 w-56 p-2 h-max rounded-xl shadow-lg bg-white border dark:bg-zinc-800 dark:border-zinc-700">
          {children || (
            <ScrollableData
              data={data!}
              title={title}
              current={current}
              ref={ref}
              onClick={onClick}
            />
          )}
        </div>
      )}
    </>
  );
};

export const ScrollableDropdown = ({
  btnName,
  btnClassName,
  id,
  title,
  data,
  parentRef,
  curr: peek,
  onFocus,
  onClick,
  onSubmit
}: {
  btnName: string;
  btnClassName?: string;
  id?: string;
  parentRef?: React.MutableRefObject<any>;
  title: string;
  data: readonly any[] | any[];
  curr: any;
  onFocus?: (...values: any) => void;
  onClick?: (...values: any) => void;
  onSubmit?: (...values: any) => void;
}) => {
  const [isOpen, open, close] = useOpen();

  const ref = useDropdownRef<HTMLDivElement>(close);

  const toggle = isOpen ? close : open;

  return (
    <div
      id="dropdown"
      ref={ref}
      className="my-2 w-full place-items-center"
      onBlur={(e) => {
        close();
      }}
    >
      <Button
        type="button"
        id="__dropdown-btn"
        className={btnClassName + " min-w-max h-min"}
        variant="secondary"
        onClick={toggle}
        name={(btnName as string)?.replaceAll(" ", "_").toLowerCase()}
      >
        {btnName}: <small className="capitalize">{peek}</small>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <AnimationComponent>
            <Dropdown
              isOpen={isOpen}
              data={data}
              title={title}
              current={peek}
              ref={parentRef}
              onClick={onSubmit}
            />
          </AnimationComponent>
        )}
      </AnimatePresence>
    </div>
  );
};

const TimezoneDropdown = ({ timezone }) => {
  return (
    <ScrollableDropdown
      id="timeZone"
      btnName="Timezone"
      title="Select Timezone"
      data={timeZones}
      curr={timezone}
    />
  );
};

const LocaleDropdown = ({ locale }: { locale: Locale }) => {
  return (
    <ScrollableDropdown
      id="locale"
      btnName={"Locale"}
      title="Select Locale"
      curr={locale}
      data={locales}
    />
  );
};

const AgeDropdown = ({ age }) => {
  return (
    <>
      <ScrollableDropdown
        id="age"
        btnName="Age"
        title="Select Age"
        data={["Adult", "Child"]}
        curr={age}
      />
    </>
  );
};

export { AgeDropdown, LocaleDropdown, TimezoneDropdown };
export default Dropdown;
