import { useEffect, useState } from "react";
import "./appointmentItem.scss";
import {
	ActiveAppointment,
	IAppointment,
} from "../../shared/interfaces/appointment.interface";
import dayjs from "dayjs";

function AppointmentItem(data: ActiveAppointment | IAppointment) {
	const [timeLeft, changeTimeLeft] = useState<string | null>(null);
	const isCanceled: boolean = "canceled" in data;

	useEffect(() => {
		const intervalId = setInterval(() => {
			console.log("interval");

			changeTimeLeft(
				`${dayjs(data.date).diff(undefined, "h")}:${
					dayjs(data.date).diff(undefined, "m") % 60
				}`
			);
		}, 60000);

		return () => {
			clearInterval(intervalId);
		};
	}, [data.date]);

	const formattedDate = dayjs(data.date).format("DD/MM/YYYY HH:mm");

	console.log(timeLeft);

	return (
		<div className="appointment">
			<div className="appointment__info">
				<span className="appointment__date">Date: {formattedDate}</span>
				<span className="appointment__name">Name: {data.name}</span>
				<span className="appointment__service">
					Service: {data.service}
				</span>
				<span className="appointment__phone">Phone: {data.phone}</span>
			</div>
			<div className="appointment__time">
				<span>Time left:</span>
				<span className="appointment__timer">{timeLeft}</span>
			</div>
			{isCanceled ? (
				<button className="appointment__cancel">Cancel</button>
			) : null}
			{/* <div className="appointment__canceled">Canceled</div> */}
		</div>
	);
}

export default AppointmentItem;
