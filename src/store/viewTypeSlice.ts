// Importing necessary functions from Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewTypeState } from '../types/types';

// Defining the initial state for the 'viewType' slice
const initialState: ViewTypeState = {
	viewType: 'month', // Default view type is set to 'month'
};

// Creating a slice named 'viewType' to handle state related to the calendar view type
const viewTypeSlice = createSlice({
	name: 'viewType', // Name of the slice (used for debugging and in Redux DevTools)
	initialState, // Initial state for the slice
	reducers: {
		// Action to set the view type (either 'month' or 'week')
		setViewType(state, action: PayloadAction<'month' | 'week'>) {
			state.viewType = action.payload; // Updating viewType with the payload value
		},
	},
});

// Exporting the action for dispatching it to update the view type
export const { setViewType } = viewTypeSlice.actions;

// Exporting the reducer to be added to the Redux store
export default viewTypeSlice.reducer;
