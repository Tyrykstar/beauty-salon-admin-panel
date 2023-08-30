import { useContext, useEffect } from "react";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

function AppointmentList() {
	const {
		activeAppointments,
		getAppointments,
		getActiveAppointments,
		appointmentLoadingStatus,
	} = useContext(AppointmentContext);

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
				<AppointmentItem key={item.id} {...item} />
			))}
		</>
	);
}

export default AppointmentList;
