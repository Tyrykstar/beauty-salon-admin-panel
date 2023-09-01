import "./modal.scss";
import { useEffect, useCallback, useContext, useState } from "react";
import Portal from "../portal/Portal";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import useAppointmentService from "../../services/AppointmentService";

interface IModalProps {
	handleClose: (state: boolean) => void;
	selectId: number;
}

function CancelModal({ handleClose, selectId }: IModalProps) {
	const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
	const { getActiveAppointments } = useContext(AppointmentContext);

	const { cancelOneAppointment } = useAppointmentService();

	const closeModal = () => {
		if (disabledBtn) {
			console.log("disabledBtn => ", disabledBtn);
			getActiveAppointments();
		}
		handleClose(false);
	};

	const handleEscapeCloseModal = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			closeModal();
		}
	};

	useEffect(() => {
		document.body.addEventListener("keydown", handleEscapeCloseModal);

		return () => {
			document.body.removeEventListener(
				"keydown",
				handleEscapeCloseModal
			);
		};
	}, [handleEscapeCloseModal]);

	const handleCancelAppointment = (id: number) => {
		console.log("cancel by id", id);
		cancelOneAppointment(id)
			.then(() => {
				setDisabledBtn(true);
				console.log("cancelOneAppointment");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Portal>
			<div className="modal">
				<div className="modal__body">
					<span className="modal__title">
						Are you sure you want to delete the appointment?{" "}
						{selectId}
					</span>
					<div className="modal__btns">
						<button
							className="modal__ok"
							disabled={disabledBtn}
							onClick={() => handleCancelAppointment(selectId)}
						>
							Ok
						</button>
						<button
							className="modal__close"
							onClick={() => closeModal()}
						>
							Close
						</button>
					</div>
					<div className="modal__status">Success</div>
				</div>
			</div>
		</Portal>
	);
}

export default CancelModal;
