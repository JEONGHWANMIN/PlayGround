import { useState } from "react";
import "./App.css";
import CustomerCard from "./components/CustomerCard";
import ReservationCard from "./components/ReservationCard";
import { addReservation } from "./redux/reducers/reservationSlice";
import { useAppDispatch, RootState, useAppSelector } from "./redux/store/store";

function App() {
	const [reservationNameInput, setReservationNameInput] = useState("");
	const dispatch = useAppDispatch();
	const reservations = useAppSelector(
		(state: RootState) => state.reservations.value
	);
	const customers = useAppSelector((state: RootState) => state.customer.value);

	const handleAddReservations = () => {
		if (!reservationNameInput) return;
		dispatch(addReservation(reservationNameInput));
		setReservationNameInput("");
	};
	return (
		<div className="App">
			<div className="container">
				<div className="reservation-container">
					<div>
						<h5 className="reservation-header">Reservations</h5>
						<div className="reservation-cards-container">
							{reservations.map((reservation, index) => (
								<ReservationCard
									key={index}
									name={reservation}
									index={index}
								/>
							))}
						</div>
					</div>
					<div className="reservation-input-container">
						<input
							value={reservationNameInput}
							onChange={(e) => setReservationNameInput(e.target.value)}
						/>
						<button onClick={handleAddReservations}>Add</button>
					</div>
					<div className="customer-food-container">
						{customers.map((customer) => (
							<CustomerCard
								key={customer.id}
								name={customer.name}
								food={customer.food}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
