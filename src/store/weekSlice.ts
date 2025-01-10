// Importing necessary functions from Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeekState } from '../types/types';

// Defining the initial state of the 'week' slice
const initialState: WeekState = {
	selectedWeek: 0, // Defaulting to the first week (0-indexed)
	currentMonth: new Date().getMonth(), // Defaulting to the current month
	currentYear: new Date().getFullYear(), // Defaulting to the current year
};

// Creating a slice named 'week', which handles week-related state updates
const weekSlice = createSlice({
	name: 'week', // Name of the slice (used for debugging and in Redux DevTools)
	initialState, // Initial state for the slice
	reducers: {
		// Action to set the selected week
		setSelectedWeek(state, action: PayloadAction<number>) {
			state.selectedWeek = action.payload; // Updating selectedWeek with the payload value
		},
		// Action to set the current month
		setCurrentMonth(state, action: PayloadAction<number>) {
			state.currentMonth = action.payload; // Updating currentMonth with the payload value
		},
		// Action to set the current year
		setCurrentYear(state, action: PayloadAction<number>) {
			state.currentYear = action.payload; // Updating currentYear with the payload value
		},
	},
});

// Exporting the actions for dispatching them from components or other parts of the app
export const { setSelectedWeek, setCurrentMonth, setCurrentYear } =
	weekSlice.actions;

// Exporting the reducer to be added to the Redux store
export default weekSlice.reducer;
