import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event, EventState } from '../types/types';

const initialState: EventState = {
	events: [],
};

const EventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		setEventDate(state, action: PayloadAction<{ id: number; date: string }>) {
			const event = state.events.find(
				(event) => event.id === action.payload.id,
			);
			if (event) {
				event.date = action.payload.date;
			}
		},
		setEventStartTime(
			state,
			action: PayloadAction<{ id: number; startTime: string }>,
		) {
			const event = state.events.find(
				(event) => event.id === action.payload.id,
			);
			if (event) {
				event.startTime = action.payload.startTime;
			}
		},
		setEventEndTime(
			state,
			action: PayloadAction<{ id: number; endTime: string }>,
		) {
			const event = state.events.find(
				(event) => event.id === action.payload.id,
			);
			if (event) {
				event.endTime = action.payload.endTime;
			}
		},
		setEventTitle(state, action: PayloadAction<{ id: number; title: string }>) {
			const event = state.events.find(
				(event) => event.id === action.payload.id,
			);
			if (event) {
				event.title = action.payload.title;
			}
		},
		addEvent(state, action: PayloadAction<Event>) {
			if (!state.events) {
				state.events = [];
			}
			state.events.push(action.payload);
		},
		deleteEvent(state, action: PayloadAction<number>) {
			state.events = state.events.filter(
				(event) => event.id !== action.payload,
			);
		},
	},
});

export const {
	setEventDate,
	setEventStartTime,
	setEventEndTime,
	setEventTitle,
	addEvent,
	deleteEvent,
} = EventSlice.actions;
export default EventSlice.reducer;
