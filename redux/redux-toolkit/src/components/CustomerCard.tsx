import React from "react";
import { addCustomer } from "src/redux/reducers/customerSlice";
import { useAppDispatch } from "src/redux/store/store";

interface Props {
	name: string;
	food: string[];
}

function CustomerCard({ name, food }: Props) {
	const dispatch = useAppDispatch();
	return (
		<div className="customer-food-container">
			<p>{name}</p>
			<div className="customer-foods-container">
				<div className="customer-food">
					{food.map((fod: string) => (
						<li>{fod}</li>
					))}
				</div>
				<div className="customer-food-input-container">
					<input />
					<button
						onClick={() =>
							dispatch(
								addCustomer({
									id: "1",
									name: "HwanMIn",
									food: ["pizza", "cola"],
								})
							)
						}
					>
						Add
					</button>
				</div>
			</div>
		</div>
	);
}
export default CustomerCard;
