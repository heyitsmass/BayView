import React, { SyntheticEvent, useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import styles from "../input.module.css"

import {
  faCalendarDays,
  faClose,
  faLocationArrow,
  faArrowRight,
  faUser,
  faChair,
} from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";

type LocationModalProps = {
  open: boolean;
  onClose: (e?: SyntheticEvent) => void;
}; 

const ReactCalendarDemo = ({ date, setDate, label, name, placeholder}) => {
   let [isOpen, setIsOpen] = useState(false);

   function closeModal() {
     setIsOpen(false);
   }

   function openModal() {
     setIsOpen(true);
   }

  const handleChange = (value) => {
    setDate(value);
    setIsOpen(false);
  };

  return (
    <>
      {label ? (
        <label className={styles.label}>
          {label}
        </label>
      ) : (
        <div className="w-full h-7"></div>
      )}
    
      <div className={styles.inputWrapper}>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faCalendarDays}
          onClick={openModal}
        />
        <input
          className={styles.input}
          value={date.toLocaleDateString()} required placeholder = {placeholder}
        ></input>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog open={isOpen} onClose={closeModal}>
          <div className="fixed inset-0 flex w-screen items-center ml-3 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xs max-h-min rounded bg-white pl-5 pb-5 pr-5 border-4 border-gray-200">
                <div className="text-2xl font-bold text-center pb-3 pt-2">
                  <Dialog.Title>Select Date</Dialog.Title>
                </div>
                <div>
                  <p
                    suppressHydrationWarning={true}
                    className="text-center pb-5"
                  >
                    {" "}
                    {date.toLocaleDateString()}
                  </p>
                </div>
                <Calendar
                  /*className={`${styles.reactCalendar}`}*/
                  minDate={new Date()}
                  value={date}
                  onChange={handleChange}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ReactCalendarDemo;
