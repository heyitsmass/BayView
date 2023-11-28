import React, {useState, Fragment, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import {
  faCalendarDays
} from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";
import Input from "@/components/Input";
import Card from "@/components/HomePage/Card";

type calendarType = {
  name: string;
  label?: string;
  placeholder?: string;
  minDate?: Date;
  disabled?: boolean;
  value?: string;
};

const BayviewCalendar = ({ label, name, placeholder, value, minDate, disabled} : calendarType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  const [inputValue, setInputValue] = useState(value || ''); // State for the input value
  const [dateValue, setDateValue] = useState<Date | null>(null); // State for the validated date
  const inputRef = useRef<HTMLDivElement>(null); // Ref for the input element

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDialogPosition({ top: rect.bottom + window.scrollY -10, left: rect.left + window.scrollX });
    }
  }, [isOpen]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (value) => {
    setDateValue(value);
    setInputValue(value.toDateString());
    setIsOpen(false);
  };

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const onBlur = (event) => {
    // Validate the date only when the input field loses focus
    const inputDate = new Date(event.target.value);
    if (!isNaN(inputDate.getTime())) {
      setDateValue(inputDate); // Update dateValue with the valid date
      setInputValue(inputDate.toDateString());
    } else if(inputValue !== "") {
      setDateValue(null); // Clear dateValue if invalid
      setInputValue("")
    }
  }

  return (
		<>
			<div ref={inputRef}>
				<Input
					label={label}
          autoComplete="off"
					name={name}
          onChange={onInputChange}
          onBlur={onBlur}
					placeholder={placeholder}
          value={inputValue} 
					icon={{ icon: faCalendarDays, onClick: !disabled ? openModal : undefined }}
					required
				/>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog open={isOpen} onClose={closeModal}>
					{/* <div className="fixed inset-0 bg-black/30" aria-hidden="true" /> */}
					<div
						className={`fixed inset-0 flex h-min`}
						style={{
							position: 'absolute',
							top: `${dialogPosition.top}px`,
							left: `${dialogPosition.left}px`,
						}}
					>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel>
								<Card className="w-full max-w-xs max-h-min shadow-2xl">
									{/* <Dialog.Title className="text-2xl font-bold text-center pb-3 pt-2">Select {title} Date</Dialog.Title> */}
									<Calendar minDate={minDate} value={dateValue} onChange={handleChange} />
								</Card>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default BayviewCalendar;
