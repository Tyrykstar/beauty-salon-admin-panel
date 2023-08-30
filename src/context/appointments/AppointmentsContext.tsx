import { ReactNode, createContext, useReducer } from "react";

import reducer, { IAppointmentState } from "./reducer";
import { ActionsTypes } from "./actions";
import useAppointmentService from "../../services/AppointmentService";

const initialState: IAppointmentState = {
	allAppointments: [],
	activeAppointments: [],
	appointmentLoadingStatus: "idle",
};

interface ProviderProps {
	children: React.ReactNode;
}

interface AppointmentContextValue extends IAppointmentState {
	getAppointments: () => void;
	getActiveAppointments: () => void;
}

export const AppointmentContext = createContext<AppointmentContextValue>({
	allAppointments: initialState.allAppointments,
	activeAppointments: initialState.activeAppointments,
	appointmentLoadingStatus: initialState.appointmentLoadingStatus,
	getAppointments: () => {},
	getActiveAppointments: () => {},
});

const AppointmentContextProvider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { loadingStatus, getAllActiveAppointments, getAllAppointments } =
		useAppointmentService();

	const value: AppointmentContextValue = {
		allAppointments: state.allAppointments,
		activeAppointments: state.activeAppointments,
		appointmentLoadingStatus: loadingStatus,
		getAppointments: () => {
			getAllAppointments()
				.then((data) => {
					dispatch({
						type: ActionsTypes.SET_ALL_APPOINTMENTS,
						payload: data,
					});
				})
				.catch((err) => console.log(err));
		},
		getActiveAppointments: () => {
			getAllActiveAppointments()
				.then((data) => {
					console.log("data => ", data);

					dispatch({
						type: ActionsTypes.SET_ACTIVE_APPOINTMENTS,
						payload: data,
					});
				})
				.catch((err) => console.log(err));
		},
	};

	return (
		<AppointmentContext.Provider value={value}>
			{children}
		</AppointmentContext.Provider>
	);
};

export default AppointmentContextProvider;
