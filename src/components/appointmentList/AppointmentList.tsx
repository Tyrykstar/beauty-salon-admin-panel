import { useContext, useEffect, useState } from "react";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import CancelModal from "../modal/CancelModal";

import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

function AppointmentList() {
	const {
		activeAppointments,
		getAppointments,
		getActiveAppointments,
		appointmentLoadingStatus,
	} = useContext(AppointmentContext);

	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, setSelectedId] = useState(0);

	useEffect(() => {
		console.log("useEffect");

		getActiveAppointments();
	}, []);

	if (appointmentLoadingStatus === "loading") {
		return <Spinner />;
	} else if (appointmentLoadingStatus === "error") {
		return (
			<>
				<Error />
				<button
					className="schedule__reload"
					onClick={getActiveAppointments}
				>
					Try to reload the page
				</button>
			</>
		);
	}

	return (
		<>
			{activeAppointments.map((item) => (
				<AppointmentItem
					key={item.id}
					{...item}
					openModal={setIsOpen}
					selectId={() => setSelectedId(item.id)}
				/>
			))}

			{isOpen ? (
				<CancelModal handleClose={setIsOpen} selectId={selectedId} />
			) : null}
		</>
	);
}

export default AppointmentList;
