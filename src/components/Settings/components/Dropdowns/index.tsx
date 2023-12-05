"use client";
import { AnimationComponent } from "@/components/Animations/AnimatePresenceComponent";
import Button from "@/components/Button";
import { useOpen } from "@/hooks";
import { timeZones } from "@/types";
import { Locale, locales } from "@/utils/openWeather/langText";
import { AnimatePresence } from "framer-motion";

import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useDropdownRef } from "../../hooks/useDropdownRef";
import { ScrollableData } from "../ScrollableData";
import ReactPortal from "@/components/ReactPortal";
export const Dropdown = ({
  isOpen,
  data,
  current,
  title,
  children,
  onClick
}: {
  isOpen: boolean;
  data?: readonly any[] | any[];
  current: any;
  title: string;
  children?: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <>
      {isOpen && (
        <div className="absolute top-full overflow-hidden right-0 mt-6 w-56 p-2 h-max rounded-xl shadow-lg bg-white border dark:bg-zinc-800 dark:border-zinc-700">
          {children || (
            <ScrollableData
              data={data!}
              title={title}
              current={current}
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
  id,
  title,
  data,
  peek,
  onClick,
  onSubmit
}: {
  btnName: string;
  id?: string;
  title: string;
  data: readonly any[] | any[];
  peek: any;
  onClick?: (e) => void;
  onSubmit?: (...values: any) => void;
}) => {
  const [isOpen, open, close] = useOpen();

  const ref = useDropdownRef(close);

  const toggle = () => (isOpen ? close() : open());
  return (
    <div ref={ref}>
      <Button
        type="button"
        id={id}
        className="w-full"
        variant="secondary"
        onClick={toggle}
        name={(btnName as string)?.replaceAll(" ", "_").toLowerCase()}
      >
        {btnName} <small className="capitalize">({peek})</small>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div>
            <AnimationComponent>
              <Dropdown
                isOpen={isOpen}
                data={data}
                title={title}
                current={peek}
                onClick={(onSubmit as () => void) || undefined}
              />
            </AnimationComponent>
          </motion.div>
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
      peek={timezone}
    />
  );
};

const LocaleDropdown = ({ locale }: { locale: Locale }) => {
  return (
    <ScrollableDropdown
      id="locale"
      btnName={"Locale"}
      title="Select Locale"
      peek={locale}
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
        peek={age}
      />
    </>
  );
};

export { AgeDropdown, LocaleDropdown, TimezoneDropdown };
export default Dropdown;
