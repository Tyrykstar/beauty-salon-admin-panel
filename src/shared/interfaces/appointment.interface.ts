export interface IAppointment {
	id: number;
	date: string;
	name: string;
	service: string;
	phone: string;
	canceled: boolean;
}

export type ActiveAppointment = Omit<IAppointment, "canceled">;

// export type ActiveAppointment = {
// 	id: number;
// 	date: string;
// 	name: string;
// 	service: string;
// 	phone: string;
// 	canceled: boolean;
// };
