import { useContext, useEffect, useState, useCallback } from "react";
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
		getActiveAppointments();

		console.log("render AppointmentList useEffect");
	}, []);

	const handleOpenModal = useCallback((id: number) => {
		setIsOpen(true);
		setSelectedId(id);
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

	console.log("render AppointmentList");

	return (
		<>
			{activeAppointments.map((item) => (
				<AppointmentItem
					key={item.id}
					{...item}
					openModal={handleOpenModal}
				/>
			))}

			{isOpen ? (
				<CancelModal handleClose={setIsOpen} selectId={selectedId} />
			) : null}
		</>
	);
}

export default AppointmentList;
