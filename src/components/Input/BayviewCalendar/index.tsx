import React, {useState, Fragment, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import {
  faCalendarDays,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";
import Input from "@/components/Input";
import Card from "@/components/HomePage/Card";
import Button from "@/components/Button";

type calendarType = {
  name: string;
  label?: string;
  placeholder?: string;
  minDate?: Date;
  includeTime?: boolean;
  disabled?: boolean;
  value?: string;
};

const BayviewCalendar = ({ label, name, placeholder, value, minDate, includeTime, disabled} : calendarType) => {
	const [isOpen, setIsOpen] = useState(false);
	const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
	const [inputValue, setInputValue] = useState(value || ''); // State for the input value
	const [dateValue, setDateValue] = useState<Date | null>(null); // State for the validated date
	const [timeValue, setTime] = useState('12:00');
	const inputRef = useRef<HTMLDivElement>(null); // Ref for the input element
	const timeRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			const rect = inputRef.current.getBoundingClientRect();
			setDialogPosition({ top: rect.bottom + window.scrollY - 10, left: rect.left + window.scrollX });
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

	const handleDateTimeChange = (value) => {
    if(timeRef) {
      // @ts-ignore
      setTime(timeRef.current.value);
    }
    // @ts-ignore
    const updatedDate = combineDateAndTime(value, timeRef.current.value);
    setDateValue(updatedDate);
    setInputValue(formatDateTime(updatedDate)); 
	};

	const onInputChange = (event) => {
		setInputValue(event.target.value);
	};

  const onInputTimeChange = (event) => {
    setInputValue(event.target.value);
    setTime(extractTimeForInput(event.target.value));
  };

  // Helper function to reparse date from string
  const extractDateFromString = (dateStr) => {
    const parts = dateStr.match(/(\w{3}) (\w{3}) (\d{2}) (\d{2}) (\d{2}):(\d{2}) (\w{2})/);
    if (!parts) {
        return null;
    }

    const [, , month, day, year, hours, minutes, ampm] = parts;
    const months = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    let hourNumber = parseInt(hours, 10);
    if (ampm.toLowerCase() === 'pm' && hourNumber < 12) {
        hourNumber += 12;
    }
    if (ampm.toLowerCase() === 'am' && hourNumber === 12) {
        hourNumber = 0;
    }

    const fullYear = 2000 + parseInt(year, 10); // Assuming the year is 20xx
    const monthIndex = months[month];
    const dayNumber = parseInt(day, 10);
    const minuteNumber = parseInt(minutes, 10);

    return new Date(fullYear, monthIndex, dayNumber, hourNumber, minuteNumber);
  }

  const onTimeChange = (event) => {
    if(timeRef.current) {
      setTime(timeRef.current.value);
      const updatedDate = combineDateAndTime(dateValue, timeRef.current.value);
      setDateValue(updatedDate);
      setInputValue(formatDateTime(updatedDate)); 
    } else {
      setInputValue(combineDateAndTime(formatDateTime(event.target.value), extractTimeForInput(event.target.value))); 
    }
  }

  const formatDateTime = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dateNum = date.getDate();
    const year = date.getFullYear().toString().substr(-2);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return `${day} ${month} ${dateNum} ${year} ${hours}:${minutes} ${ampm}`;
  };

	// Function to combine a date and a time string into a single Date object
	const combineDateAndTime = (date, timeString) => {
		const time = timeString.match(/(\d+):(\d+)\s?(AM|PM)?/i);
		if (!time) return date;

		let [, hours, minutes, modifier] = time;
		hours = parseInt(hours, 10);
		minutes = parseInt(minutes, 10);

		if (modifier) {
			// Convert 12-hour time to 24-hour time for PM
			if (modifier.toLowerCase() === 'pm' && hours < 12) {
				hours += 12;
			} // Convert 12-hour time to 24-hour time for AM
			if (modifier.toLowerCase() === 'am' && hours === 12) {
				hours = 0;
			}
		}

		const combinedDate = new Date(date);
		combinedDate.setHours(hours);
		combinedDate.setMinutes(minutes);
    return combinedDate;
	};

  const extractTimeForInput = (date) => {
		const timePattern = /(\d{1,2}):(\d{2})\s?(AM|PM)/i;
		const match = date.toString().match(timePattern);

		if (!match) {
			return '';
		}

		let [, hours, minutes, ampm] = match;
		hours = parseInt(hours, 10);

		// Convert 12-hour format to 24-hour format
		if (ampm.toLowerCase() === 'pm' && hours < 12) {
			hours += 12;
		} else if (ampm.toLowerCase() === 'am' && hours === 12) {
			hours = 0;
		}

		// Ensure hours are always two digits
		hours = hours.toString().padStart(2, '0');
		setTime(`${hours}:${minutes}`);
    return `${hours}:${minutes}`;
	};

	const onBlur = (event) => {
		// Validate the date only when the input field loses focus
		const inputDate = new Date(event.target.value);
		if (!isNaN(inputDate.getTime())) {
			setDateValue(inputDate); // Update dateValue with the valid date
			setInputValue(inputDate.toDateString());
		} else if (inputValue !== '') {
			setDateValue(null); // Clear dateValue if invalid
			setInputValue('');
		}
	};

  const onBlurTime = (event) => {
		// Validate the date only when the input field loses focus
		const inputDate = new Date(event.target.value);
		if (!isNaN(inputDate.getTime())) {
			setDateValue(inputDate); // Update dateValue with the valid date
			setInputValue(formatDateTime(inputDate));
		} else if (inputValue !== '') {
			setDateValue(null); // Clear dateValue if invalid
			setInputValue('');
      setTime('12:00'); 
		}
	};

	return (
		<>
			{includeTime && <div ref={inputRef}>
				<Input
					label={label}
					autoComplete="off"
					name={name}
					onChange={onInputTimeChange}
					onBlur={onBlurTime}
          value={inputValue}
					placeholder={placeholder}
					icon={{ icon: faCalendarDays, onClick: !disabled ? openModal : undefined }}
					required
				/>
			</div>}

      {!includeTime && <div ref={inputRef}>
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
			</div>}

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog open={isOpen} onClose={closeModal}>
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
								<div className="flex justify-center align-middle h-full">
									<Card className="w-full max-w-xs max-h-100 shadow-2xl overflow-clip">
										{includeTime ? (
											<>
												<Calendar minDate={minDate} value={dateValue} onChange={handleDateTimeChange} />
												<div className="bg-zinc-200 w-[75%] m-auto h-0.5 mt-2 rounded-full"></div>
												<div className="flex align-middle items-center content-around mt-2 w-full h-full">
													<div className="flex w-4/6">
														<Input
															ref={timeRef}
                              value={timeValue}
															onChange={onTimeChange}
															icon={{
																icon: faClock,
																onClick: (e) => {
																	timeRef.current?.showPicker();
																},
															}}
															type="time"
															label="Time"
															className="w-full pl-2 hide-time-icon"
														></Input>
													</div>
													<div className="w-1/6 h-full flex items-center align-middle mt-3 mx-auto">
														<Button variant="primary" onClick={() => setIsOpen(false)} className="-mb-3">
															Ok
														</Button>
													</div>
												</div>
											</>
										) : (
											<Calendar minDate={minDate} value={dateValue} onChange={handleChange} />
										)}
									</Card>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
export default BayviewCalendar;