// Importing necessary functions and types
import { createSlice, PayloadAction } from '@reduxjs/toolkit'; // To create slice and manage actions
import { Event, EventState } from '../types/types'; // Importing types for events and state structure

// Initial state for the events slice
const initialState: EventState = {
	events: [], // Initially, no events are present
};

// Creating the EventSlice using createSlice
const EventSlice = createSlice({
	name: 'event', // Name of the slice
	initialState, // The initial state defined above
	reducers: {
		// Action to set the event date based on the event id
		setEventDate(state, action: PayloadAction<{ id: number; date: string }>) {
			const event = state.events.find(
				(event) => event.id === action.payload.id, // Finding the event by id
			);
			if (event) {
				event.date = action.payload.date; // Updating the date of the event
			}
		},

		// Action to set the event start time based on the event id
		setEventStartTime(
			state,
			action: PayloadAction<{ id: number; startTime: string }>,
		) {
			const event = state.events.find(
				(event) => event.id === action.payload.id, // Finding the event by id
			);
			if (event) {
				event.startTime = action.payload.startTime; // Updating the start time of the event
			}
		},

		// Action to set the event end time based on the event id
		setEventEndTime(
			state,
			action: PayloadAction<{ id: number; endTime: string }>,
		) {
			const event = state.events.find(
				(event) => event.id === action.payload.id, // Finding the event by id
			);
			if (event) {
				event.endTime = action.payload.endTime; // Updating the end time of the event
			}
		},

		// Action to set the event title based on the event id
		setEventTitle(state, action: PayloadAction<{ id: number; title: string }>) {
			const event = state.events.find(
				(event) => event.id === action.payload.id, // Finding the event by id
			);
			if (event) {
				event.title = action.payload.title; // Updating the title of the event
			}
		},

		// Action to add a new event
		addEvent(state, action: PayloadAction<Event>) {
			if (!state.events) {
				state.events = []; // Ensure events array is initialized
			}
			state.events.push(action.payload); // Add the new event to the array
		},

		// Action to delete an event by its id
		deleteEvent(state, action: PayloadAction<number>) {
			state.events = state.events.filter(
				(event) => event.id !== action.payload, // Remove event with matching id
			);
		},
	},
});

// Exporting actions to be dispatched from components
export const {
	setEventDate,
	setEventStartTime,
	setEventEndTime,
	setEventTitle,
	addEvent,
	deleteEvent,
} = EventSlice.actions;

// Exporting the reducer to be included in the Redux store
export default EventSlice.reducer;
