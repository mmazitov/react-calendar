import React, { useEffect, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import {
	addEvent,
	deleteEvent,
	setEventDate,
	setEventEndTime,
	setEventStartTime,
	setEventTitle,
} from '../../../store/eventSlice';
import { RootState } from '../../../store/store';
import EventInfoModal from '../../modals/EventInfoModal';
import EventModal from '../../modals/EventModal';
import MonthHeading from '../headings/MonthHeading';
import './index.css';

interface Holiday {
	date: string;
	localName: string;
}

interface Event {
	id: number;
	date: string;
	title: string;
	startTime: string;
	endTime: string;
}

interface Day {
	year: number;
	month: number;
	day: number;
	isCurrentMonth: boolean;
}

interface MonthViewProps {
	days: Day[];
	isHoliday: (day: number, month: number, year: number) => Holiday | undefined;
	isWeekend: (day: number, month: number, year: number) => boolean;
	isToday: (day: number, month: number, year: number) => boolean;
}

const EventItem: React.FC<{ event: Event; onClick: () => void }> = ({
	event,
	onClick,
}) => {
	const [, drag] = useDrag(() => ({
		type: 'EVENT',
		item: { id: event.id, date: event.date },
	}));
	return (
		<small
			ref={drag}
			className="block bg-blue-200 p-[5px] rounded-[5px] cursor-pointer"
			onClick={onClick}
		>
			{event.title}
		</small>
	);
};

const DayCell: React.FC<{
	day: Day;
	events: Event[];
	isHoliday: (day: number, month: number, year: number) => Holiday | undefined;
	isWeekend: (day: number, month: number, year: number) => boolean;
	isToday: (day: number, month: number, year: number) => boolean;
	onDropEvent: (eventId: number, newDate: string) => void;
	onDayClick: (dateKey: string) => void;
	onEventClick: (event: Event) => void;
}> = ({
	day,
	events,
	isHoliday,
	isWeekend,
	isToday,
	onDropEvent,
	onDayClick,
	onEventClick,
}) => {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'EVENT',
		drop: (item: { id: number; date: string }) => {
			const newDate = `${day.year}-${String(day.month + 1).padStart(2, '0')}-${String(
				day.day,
			).padStart(2, '0')}`;
			onDropEvent(item.id, newDate);
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	const holiday = isHoliday(day.day, day.month, day.year);
	const weekend = isWeekend(day.day, day.month, day.year);
	const todayFlag = isToday(day.day, day.month, day.year);
	const dateKey = `${day.year}-${String(day.month + 1).padStart(2, '0')}-${String(
		day.day,
	).padStart(2, '0')}`;

	const isFirstDayOfMonth = day.day === 1;
	const monthName = isFirstDayOfMonth
		? new Date(day.year, day.month).toLocaleString('default', {
				month: 'short',
			})
		: '';

	const totalEvents = (holiday ? 1 : 0) + events.length;

	return (
		<div
			ref={drop}
			className={`day hover:bg-slate-400 transition-colors min-h-[80px] ${
				weekend ? 'weekend' : ''
			} ${holiday ? 'holiday' : ''} ${todayFlag ? 'today' : ''} ${
				day.isCurrentMonth ? '' : 'outer'
			} ${isOver ? 'bg-gray-200' : ''}`}
			onClick={() => onDayClick(dateKey)}
		>
			<div className="flex items-center gap-[1px] mb-[3px] day-heading">
				{isFirstDayOfMonth && <strong>{monthName} </strong>}
				<strong>{day.day}</strong>
				{totalEvents > 0 && (
					<span className="text-[#000] text-xs">
						{totalEvents} {totalEvents > 1 ? 'events' : 'event'}
					</span>
				)}
			</div>

			<div className="flex flex-col gap-2 day-event">
				{holiday && (
					<small className="block bg-[#ffffff] p-[5px] rounded-[5px]">
						{holiday.localName}
					</small>
				)}
				{events.map((event) => (
					<EventItem
						key={event.id}
						event={event}
						onClick={() => onEventClick(event)}
					/>
				))}
			</div>
		</div>
	);
};

const MonthView: React.FC<MonthViewProps> = ({
	days,
	isWeekend,
	isHoliday,
	isToday,
}) => {
	const dispatch = useDispatch();
	const events = useSelector((state: RootState) => state.event.events) || [];
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [newEventTitle, setNewEventTitle] = useState<string>('');
	const [newEventStartTime, setNewEventStartTime] = useState<string>('');
	const [newEventEndTime, setNewEventEndTime] = useState<string>('');
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
	const [isEditing, setIsEditing] = useState<boolean>(false);
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
			setNewEventTitle('');
			setNewEventStartTime('');
			setNewEventEndTime('');
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
			setNewEventTitle('');
			setNewEventStartTime('');
			setNewEventEndTime('');
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
			setSelectedDate(null);
			setSelectedEvent(null);
			setIsEditing(false);
		}
	};

	const handleEscapePress = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setSelectedDate(null);
			setSelectedEvent(null);
			setIsEditing(false);
			clearEventData();
		}
	};

	const clearEventData = () => {
		setNewEventTitle('');
		setNewEventStartTime('');
		setNewEventEndTime('');
		setNewEventEndTime('');
	};

	const handleDropEvent = (eventId: number, newDate: string) => {
		dispatch(setEventDate({ id: eventId, date: newDate }));
	};

	const handleDayClick = (dateKey: string) => {
		setSelectedDate(dateKey);
		setIsEditing(false);
	};

	const handleEventClick = (event: Event) => {
		setSelectedEvent(event);
		setIsEditing(false);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscapePress);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscapePress);
		};
	}, []);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="flex-grow calendar-grid">
				<MonthHeading />
				<div className="gap-[5px] grid grid-cols-7 auto-rows-fr h-[calc(100vh-139px)] min-h-[425px]">
					{days.map((day, index) => {
						const dayEvents = events.filter(
							(event) =>
								event.date ===
								`${day.year}-${String(day.month + 1).padStart(2, '0')}-${String(
									day.day,
								).padStart(2, '0')}`,
						);

						return (
							<DayCell
								key={index}
								day={day}
								events={dayEvents}
								isHoliday={isHoliday}
								isWeekend={isWeekend}
								isToday={isToday}
								onDropEvent={handleDropEvent}
								onDayClick={handleDayClick}
								onEventClick={handleEventClick}
							/>
						);
					})}
				</div>

				{selectedDate && !isEditing && !selectedEvent && (
					<EventModal
						selectedDate={selectedDate}
						newEventTitle={newEventTitle}
						newEventStartTime={newEventStartTime}
						newEventEndTime={newEventEndTime}
						setNewEventTitle={setNewEventTitle}
						setNewEventStartTime={(time: string) => setNewEventStartTime(time)}
						setNewEventEndTime={(time: string) => setNewEventEndTime(time)}
						setNewEventDate={setSelectedDate}
						addEvent={handleAddEvent}
						closeModal={() => {
							setSelectedDate(null);
							setSelectedEvent(null);
							clearEventData();
						}}
						buttonText="Add"
						modalRef={modalRef}
					/>
				)}

				{selectedEvent && isEditing && (
					<EventModal
						selectedDate={selectedEvent.date}
						newEventTitle={newEventTitle}
						newEventStartTime={newEventStartTime}
						newEventEndTime={newEventEndTime}
						setNewEventTitle={setNewEventTitle}
						setNewEventStartTime={(time: string) => setNewEventStartTime(time)}
						setNewEventEndTime={(time: string) => setNewEventEndTime(time)}
						setNewEventDate={(date: string) => setSelectedDate(date)}
						addEvent={handleEditEvent}
						closeModal={() => {
							setSelectedEvent(null);
							setSelectedDate(null);
							setIsEditing(false);
						}}
						buttonText="Save"
						modalRef={modalRef}
					/>
				)}

				{selectedEvent && !isEditing && (
					<EventInfoModal
						event={selectedEvent}
						closeModal={() => {
							setSelectedEvent(null);
							setSelectedDate(null);
							clearEventData();
						}}
						deleteEvent={() => handleDeleteEvent(selectedEvent)}
						openEditModal={() => {
							setIsEditing(true);
							openEditModal(selectedEvent);
						}}
					/>
				)}
			</div>
		</DndProvider>
	);
};

export default MonthView;
