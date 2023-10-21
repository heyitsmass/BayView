"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import styles from "./submitbutton.module.css";

// Define the SubmitButton component.
export default function SubmitButton({ ...props }) {

	// Use the experimental_useFormStatus hook to get the form submission status.
	const { pending } = useFormStatus();

	return (
		<div>
			<button
				type="button"
				className={styles.submitButton}
				disabled={pending}> 
				Find Flights
			</button>
		</div>
	);
}
