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

export const useEventHandlers = () => {
	const dispatch = useDispatch();
	const events = useSelector((state: RootState) => state.event.events) || [];
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [newEventTitle, setNewEventTitle] = useState<string>('');
	const [newEventStartTime, setNewEventStartTime] = useState<string>('');
	const [newEventEndTime, setNewEventEndTime] = useState<string>('');
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const modalRef = useRef<HTMLDivElement>(null);

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
			dispatch(addEvent(newEvent));
			clearEventData();
			setSelectedDate(null);
		}
	};

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
			clearEventData();
			setSelectedEvent(null);
			setSelectedDate(null);
			setIsEditing(false);
		}
	};

	const handleDeleteEvent = (eventToDelete: Event) => {
		dispatch(deleteEvent(eventToDelete.id));
		setSelectedEvent(null);
		setSelectedDate(null);
	};

	const openEditModal = (event: Event) => {
		setSelectedEvent(event);
		setNewEventTitle(event.title);
		setNewEventStartTime(event.startTime);
		setNewEventEndTime(event.endTime);
		setSelectedDate(event.date);
		setIsEditing(true);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			clearEventData();
			setSelectedDate(null);
			setSelectedEvent(null);
			setIsEditing(false);
		}
	};

	const handleEscapePress = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			clearEventData();
			setSelectedDate(null);
			setSelectedEvent(null);
			setIsEditing(false);
		}
	};

	const handleDropEvent = (eventId: number, newDate: string) => {
		dispatch(setEventDate({ id: eventId, date: newDate }));
		const event = events.find((event) => event.id === eventId);
		if (event) {
			openEditModal({ ...event, date: newDate });
		}
	};

	const handleDayClick = (dateKey: string) => {
		setSelectedDate(dateKey);
		setSelectedEvent(null);
		setIsEditing(false);
	};

	const handleEventClick = (event: Event) => {
		setSelectedEvent(event);
		setSelectedDate(null);
		setIsEditing(false);
	};

	const clearEventData = () => {
		setNewEventTitle('');
		setNewEventStartTime('');
		setNewEventEndTime('');
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscapePress);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscapePress);
		};
	}, []);

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
