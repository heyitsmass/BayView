//intended to launch a command that takes our user's information and submit it to reserve the selected hotel room

'use client'
import { ButtonHTMLAttributes, DetailedHTMLProps, SyntheticEvent, useEffect, useId, useState } from "react";

export type SubmitButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
const SubmitReservationButton = ({...props}: SubmitButtonProps) => {

    const hotelId = {};
    const [passedObject, setObject] = useState({});

    const SubmitForReservation = (e:SyntheticEvent) => {
        e.preventDefault();

    }

}

export default SubmitReservationButton;