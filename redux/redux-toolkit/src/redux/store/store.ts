import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import reservationSlice from "src/redux/reducers/reservationSlice";
import customerSlice from "../reducers/customerSlice";
export const store = configureStore({
	reducer: {
		reservations: reservationSlice,
		customer: customerSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
