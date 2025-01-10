'use client';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addEvent,
	deleteEvent,
	setEventDate,
	setEventEndTime,
	setEventStartTime,
	setEventTitle,
} from '../store/eventSlice';
import { RootState } from '../store/store';
import { Event } from '../types/types';

// Custom hook for managing events such as adding, editing, deleting, and interacting with events
export const useEventHandlers = () => {
	const dispatch = useDispatch();
	// Access the current list of events from the Redux store
	const events = useSelector((state: RootState) => state.event.events) || [];

	// State variables for event data and UI control
	const [selectedDate, setSelectedDate] = useState<string | null>(null); // Date for the selected event
	const [newEventTitle, setNewEventTitle] = useState<string>(''); // Title of the new event
	const [newEventStartTime, setNewEventStartTime] = useState<string>(''); // Start time of the new event
	const [newEventEndTime, setNewEventEndTime] = useState<string>(''); // End time of the new event
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // Currently selected event for editing
	const [isEditing, setIsEditing] = useState<boolean>(false); // Flag to track whether we're in edit mode
	const [searchQuery, setSearchQuery] = useState<string>(''); // Search query to filter events
	const modalRef = useRef<HTMLDivElement>(null); // Ref for detecting clicks outside the modal

	// Function to add a new event
	const handleAddEvent = () => {
		if (
			selectedDate &&
			newEventTitle.trim() &&
			newEventStartTime.trim() &&
			newEventEndTime.trim()
		) {
			const newEvent: Event = {
				id: events.length ? events[events.length - 1].id + 1 : 1,
				date: selectedDate,
				title: newEventTitle,
				startTime: newEventStartTime,
				endTime: newEventEndTime,
			};
			dispatch(addEvent(newEvent)); // Dispatch action to add event
			clearEventData(); // Clear input fields
			setSelectedDate(null); // Deselect date after event is added
		}
	};

	// Function to edit an existing event
	const handleEditEvent = () => {
		if (
			selectedEvent &&
			newEventTitle.trim() &&
			newEventStartTime.trim() &&
			newEventEndTime.trim()
		) {
			dispatch(setEventTitle({ id: selectedEvent.id, title: newEventTitle }));
			dispatch(
				setEventStartTime({
					id: selectedEvent.id,
					startTime: newEventStartTime,
				}),
			);
			dispatch(
				setEventEndTime({ id: selectedEvent.id, endTime: newEventEndTime }),
			);
			dispatch(setEventDate({ id: selectedEvent.id, date: selectedDate! }));
			clearEventData(); // Clear input fields after editing
			setSelectedEvent(null); // Deselect event after editing
			setSelectedDate(null); // Deselect date after editing
			setIsEditing(false); // Exit edit mode
		}
	};

	// Function to delete an event
	const handleDeleteEvent = (eventToDelete: Event) => {
		dispatch(deleteEvent(eventToDelete.id)); // Dispatch action to delete event
		setSelectedEvent(null); // Deselect event after deletion
		setSelectedDate(null); // Deselect date after deletion
	};

	// Open the modal with event data for editing
	const openEditModal = (event: Event) => {
		setSelectedEvent(event); // Set selected event
		setNewEventTitle(event.title); // Pre-fill title
		setNewEventStartTime(event.startTime); // Pre-fill start time
		setNewEventEndTime(event.endTime); // Pre-fill end time
		setSelectedDate(event.date); // Pre-fill date
		setIsEditing(true); // Enable edit mode
	};

	// Handle click outside of the modal to close it
	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			clearEventData(); // Clear event data
			setSelectedDate(null); // Deselect date
			setSelectedEvent(null); // Deselect event
			setIsEditing(false); // Exit edit mode
		}
	};

	// Handle escape key press to close the modal
	const handleEscapePress = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			clearEventData(); // Clear event data
			setSelectedDate(null); // Deselect date
			setSelectedEvent(null); // Deselect event
			setIsEditing(false); // Exit edit mode
		}
	};

	// Handle the drop of an event to a new date
	const handleDropEvent = (eventId: number, newDate: string) => {
		dispatch(setEventDate({ id: eventId, date: newDate })); // Update event's date in Redux store
		const event = events.find((event) => event.id === eventId);
		if (event) {
			openEditModal({ ...event, date: newDate }); // Open modal to edit the dropped event
		}
	};

	// Handle day click to select a date for creating a new event
	const handleDayClick = (dateKey: string) => {
		setSelectedDate(dateKey); // Set the selected date
		setSelectedEvent(null); // Deselect event
		setIsEditing(false); // Disable editing mode
	};

	// Handle click on an event to select it for editing
	const handleEventClick = (event: Event) => {
		setSelectedEvent(event); // Set selected event
		setSelectedDate(null); // Deselect date
		setIsEditing(false); // Disable editing mode
	};

	// Function to clear event data after an action (add/edit)
	const clearEventData = () => {
		setNewEventTitle(''); // Clear title input
		setNewEventStartTime(''); // Clear start time input
		setNewEventEndTime(''); // Clear end time input
	};

	// Event listeners for outside clicks and escape key press
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscapePress);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscapePress);
		};
	}, []);

	// Return all handlers and state variables to be used in components
	return {
		events,
		selectedDate,
		newEventTitle,
		newEventStartTime,
		newEventEndTime,
		selectedEvent,
		isEditing,
		searchQuery,
		modalRef,
		handleAddEvent,
		handleEditEvent,
		handleDeleteEvent,
		openEditModal,
		handleDropEvent,
		handleDayClick,
		handleEventClick,
		clearEventData,
		setNewEventTitle,
		setNewEventStartTime,
		setNewEventEndTime,
		setSelectedDate,
		setSelectedEvent,
		setIsEditing,
		setSearchQuery,
	};
};
