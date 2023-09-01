import "./caform.scss";
import useAppointmentService from "../../services/AppointmentService";
import { FormEvent, useState, ChangeEvent, useContext } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { IAppointment } from "../../shared/interfaces/appointment.interface";

function CAForm() {
	const { createNewAppointment } = useAppointmentService();
	const [formData, setFormData] = useState<IAppointment>({
		id: 1,
		name: "",
		phone: "",
		service: "",
		date: "",
		canceled: false,
	});
	const [creationStatus, setCreationStatus] = useState<boolean>(false);
	const { getActiveAppointments } = useContext(AppointmentContext);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCreationStatus(true);

		createNewAppointment(formData)
			.then(() => {
				setCreationStatus(false);
				setFormData({
					id: 1,
					name: "",
					phone: "",
					service: "",
					date: "",
					canceled: false,
				});
				getActiveAppointments();
			})
			.catch((err) => {
				console.log(err);
				alert("Error while creating new apponitment");
			});
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<form className="caform" onSubmit={handleSubmit}>
			<div className="caform__title">Create new appointment</div>
			<label htmlFor="name">
				Name<span>*</span>
			</label>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="User name"
				value={formData.name}
				onChange={handleChange}
				required
			/>

			<label htmlFor="service">
				Service<span>*</span>
			</label>
			<input
				type="text"
				name="service"
				id="service"
				placeholder="Service name"
				value={formData.service}
				onChange={handleChange}
				required
			/>

			<label htmlFor="phone">
				Phone number<span>*</span>
			</label>
			<input
				type="tel"
				name="phone"
				id="phone"
				placeholder="+1 890 335 372"
				pattern="^\++[0-9]{1} [0-9]{3} [0-9]{3} [0-9]{3}"
				title="Format should be +1 804 944 567"
				value={formData.phone}
				onChange={handleChange}
				required
			/>

			<label htmlFor="date">
				Date<span>*</span>
			</label>
			<input
				type="text"
				name="date"
				id="date"
				placeholder="DD/MM/YYYY HH:mm"
				pattern="^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$"
				title="Format should be DD/MM/YYYY HH:mm"
				value={formData.date}
				onChange={handleChange}
				required
			/>
			<button disabled={creationStatus}>Create</button>
		</form>
	);
}

export default CAForm;
