import { useHttp } from "../hooks/http.hook";
import hasRequiredFields from "../utils/hasRequiredFields";
import {
	IAppointment,
	ActiveAppointment,
} from "../shared/interfaces/appointment.interface";
import dayjs from "dayjs";

const requiredFields = ["id", "date", "name", "service", "phone", "canceled"];

const useAppointmentService = () => {
	const { loadingStatus, request } = useHttp();

	const _apiBase = "http://localhost:3001/appointments";

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
		const transformed: ActiveAppointment[] = base
			.filter((item) => {
				return (
					!item.canceled &&
					dayjs(item.date).diff(undefined, "minute") > 0
				);
			})
			.map((item) => {
				return {
					id: item.id,
					date: item.date,
					name: item.name,
					phone: item.phone,
					service: item.service,
				};
			});

		return transformed;
	};

	return { loadingStatus, getAllAppointments, getAllActiveAppointments };
};

export default useAppointmentService;
