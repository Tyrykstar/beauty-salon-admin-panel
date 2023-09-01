import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { useEffect, useContext, useCallback, useState } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import App from "../app/App";

function HistoryList() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, setSelectedId] = useState(0);

	const { allAppointments, getAppointments } = useContext(AppointmentContext);

	const handleOpenModal = useCallback((id: number) => {
		setIsOpen(true);
		setSelectedId(id);
	}, []);

	useEffect(() => {
		getAppointments();
	}, []);

	console.log("allAppointments = > ", allAppointments);

	return (
		<>
			{allAppointments.map((item) => (
				<AppointmentItem
					key={item.id}
					{...item}
					openModal={handleOpenModal}
				/>
			))}
		</>
	);
}

export default HistoryList;
