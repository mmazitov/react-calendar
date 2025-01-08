import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeekState {
	selectedWeek: number;
	currentMonth: number;
	currentYear: number;
}

const initialState: WeekState = {
	selectedWeek: 5,
	currentMonth: new Date().getMonth(),
	currentYear: new Date().getFullYear(),
};

const weekSlice = createSlice({
	name: 'week',
	initialState,
	reducers: {
		setSelectedWeek(state, action: PayloadAction<number>) {
			state.selectedWeek = action.payload;
		},
		setCurrentMonth(state, action: PayloadAction<number>) {
			state.currentMonth = action.payload;
		},
		setCurrentYear(state, action: PayloadAction<number>) {
			state.currentYear = action.payload;
		},
	},
});

export const { setSelectedWeek, setCurrentMonth, setCurrentYear } =
	weekSlice.actions;
export default weekSlice.reducer;
