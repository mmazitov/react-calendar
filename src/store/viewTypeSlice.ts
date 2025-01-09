import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewTypeState } from '../types/types';

const initialState: ViewTypeState = {
	viewType: 'month',
};

const viewTypeSlice = createSlice({
	name: 'viewType',
	initialState,
	reducers: {
		setViewType(state, action: PayloadAction<'month' | 'week'>) {
			state.viewType = action.payload;
		},
	},
});

export const { setViewType } = viewTypeSlice.actions;
export default viewTypeSlice.reducer;
