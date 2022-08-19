import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface reservationsState {
	value: string[];
}

const initialState: reservationsState = {
	value: ["HwanMIn"],
};

// Slice가 store 에 등록
export const reservationsSlice = createSlice({
	name: "reservations",
	initialState,
	reducers: {
		// 타입 : PayloadAction<action type>
		addReservation: (state, action: PayloadAction<string>) => {
			state.value.push(action.payload);
		},
		removeReservation: (state, action: PayloadAction<number>) => {
			state.value.splice(action.payload, 1);
		},
	},
});

// 각각 액션 들을 export 해준다.
export const { addReservation, removeReservation } = reservationsSlice.actions;

export default reservationsSlice.reducer;
