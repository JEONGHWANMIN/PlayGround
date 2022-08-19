import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerState {
	value: Customer[];
}

interface Customer {
	id: string;
	name: string;
	food: string[];
}

const initialState: CustomerState = {
	value: [
		{
			id: "0",
			name: "asdsad",
			food: ["sadasdsa"],
		},
	],
};

// Slice가 store 에 등록
export const customerSlice = createSlice({
	name: "customers",
	initialState,
	reducers: {
		addCustomer: (state, action: PayloadAction<Customer>) => {
			console.log("Actions", action.payload);
			state.value.push(action.payload);
		},
	},
});

// 각각 액션 들을 export 해준다.
export const { addCustomer } = customerSlice.actions;

export default customerSlice.reducer;
