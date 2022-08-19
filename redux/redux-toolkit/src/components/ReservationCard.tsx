import React from "react";
import { removeReservation } from "src/redux/reducers/reservationSlice";
import { useAppDispatch } from "src/redux/store/store";
import { addCustomer } from "../redux/reducers/customerSlice";
interface ReservationCardTypes {
	name: string;
	index: number;
}

function ReservationCard({ name, index }: ReservationCardTypes) {
	const dispatch = useAppDispatch();
	return (
		<div
			onClick={() => {
				dispatch(removeReservation(index));
				console.log("도착");
			}}
			className="reservation-card-container"
		>
			{name}
		</div>
	);
}

export default ReservationCard;
