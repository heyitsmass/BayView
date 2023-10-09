//intended to launch a command that takes our user's information and submit it to reserve the selected hotel room

'use client'
import { ButtonHTMLAttributes, DetailedHTMLProps, SyntheticEvent, useEffect, useId, useState } from "react";
import styles from './pages.modules.css'
export type SubmitReservationButton = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const SubmitReservationButton = ({...props}: SubmitReservationButton) => {

    const hotelId = {};
    const [passedObject, setObject] = useState({});

    const SubmitForReservation = (e:SyntheticEvent) => {
        e.preventDefault();

    }

    return (
        <button className={"SubmitReservationButton"}>Reserve this.</button>
    )

}

export default SubmitReservationButton;