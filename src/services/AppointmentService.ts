import { useHttp } from "../hooks/http.hook";
import hasRequiredFields from "../utils/hasRequiredFields";
import {
	IAppointment,
	ActiveAppointment,
} from "../shared/interfaces/appointment.interface";

const requiredFields = ["id", "date", "name", "service", "phone", "canceled"];

const AppointmentService = () => {
	const { loadingStatus, request } = useHttp();

	const _apiBase = "http://localhost:3001/appointment";

	const getAllAppointments = async (): Promise<IAppointment[]> => {
		const res = await request({ url: _apiBase });

		if (
			res.every((item: IAppointment) =>
				hasRequiredFields(item, requiredFields)
			)
		) {
			return res;
		} else {
			throw new Error("Data does not have all the fields");
		}
	};

	const getAllActiveAppointments = async () => {
		const base = await getAllAppointments();
		const tranformed: ActiveAppointment[] = base.map((item) => {
			return {
				id: item.id,
				date: item.date,
				name: item.name,
				phone: item.phone,
				service: item.service,
			};
		});

		return tranformed;
	};

	return { loadingStatus, getAllAppointments, getAllActiveAppointments };
};
