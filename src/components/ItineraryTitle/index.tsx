import React, { ReactNode, useState, HTMLProps, Fragment } from"react";
import itineraryTitleCSS from './itinerarytitle.module.css'
import EditableInputField from "../Input/EditableInputField"
import {faLocationDot, faCalendar} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { Dialog, Transition } from "@headlessui/react";


export default function ItineraryTitle() {

      let [isOpen, setIsOpen] = useState(false);
      let [location, setLocation] = useState("...");

      const onLocationChange = (e) => {
        setLocation(e.target.value);
      };

      function closeModal() {
        setIsOpen(false);
      }

      function openModal() {
        setIsOpen(true);
      }

    return (
      <div data-testid="title-check" className={itineraryTitleCSS.title}>
        <div className={itineraryTitleCSS.header}>
          <EditableInputField initialText="Itinerary Title" />
        </div>
        <div className="pt-10">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="inline"
            onClick={openModal}
          />

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog open={isOpen} onClose={closeModal}>
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

              <div className="fixed inset-0 flex w-screen items-center justify-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-xs max-h-min rounded-2xl bg-white pl-5 pb-5 pr-5 pt-3 border-4 border-gray-200">
                    <div className="text-2xl font-bold text-center">
                      <Dialog.Title>Select Location</Dialog.Title>
                    </div>
                    <div className="block mt-6">
                      <label className="block">
                        <input
                          type="radio"
                          value="Magical Land"
                          name="Location"
                          onChange={onLocationChange}
                          checked={location === "Magical Land"}
                        />{" "}
                        Magical Land
                      </label>
                      <label className="block mt-3">
                        <input
                          type="radio"
                          value="Magical World"
                          name="Location"
                          onChange={onLocationChange}
                          checked={location === "Magical World"}
                        />{" "}
                        Magical World{" "}
                      </label>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>

          <p className="inline ml-1">{location} </p>
        </div>
        <div>
          <FontAwesomeIcon icon={faCalendar} className="inline" />
          <p className="inline ml-1"> 10/4 - 10/5 </p>
        </div>
      </div>
    );

}