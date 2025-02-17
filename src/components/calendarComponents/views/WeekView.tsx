'use client';

import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEventHandlers } from '../../../hooks/useEventHandlers';
import { Day, Holiday } from '../../../types/types';
import EventInfoModal from '../../modals/EventInfoModal';
import EventModal from '../../modals/EventModal';
import EventItem from '../EventItem';
import WeekHeading from '../headings/WeekHeading';
import './index.css';

interface WeekViewProps {
	days: Day[];
	isHoliday: (day: number, month: number, year: number) => Holiday | undefined;
	isWeekend: (day: number, month: number, year: number) => boolean;
}

// WeekView component: Displays a week's events with a time grid and modal functionality
const WeekView: React.FC<WeekViewProps> = ({ days, isHoliday, isWeekend }) => {
	// Destructure the event handlers and state management functions
	const {
		events,
		selectedDate,
		newEventTitle,
		newEventStartTime,
		newEventEndTime,
		selectedEvent,
		isEditing,
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
	} = useEventHandlers();

	// Generate an array representing each hour in a 24-hour format
	const hours = Array.from({ length: 24 }, (_, i) => {
		return i.toString().padStart(2, '0') + ':00';
	});

	return (
		<DndProvider backend={HTML5Backend}>
			{/* Main grid layout for the week view */}
			<div className="justify-start grid grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr] min-h-screen week">
				{/* Time scale section (left column showing hourly breakdown) */}
				<div className="flex flex-col col-start-1 row-span-3 w-[60px]">
					<div className="h-[100px]"></div>{' '}
					{/* Empty space to align with headings */}
					{hours.map((hour, index) => (
						<div
							key={index}
							className="relative text-right border-gray-200 bg-[#fff] pr-2 border-r h-[60px] text-gray-500 text-sm"
						>
							<span className="relative top-[-10px]">{hour}</span>
						</div>
					))}
				</div>

				{/* Day headers for each day in the week */}
				<div className="grid grid-cols-7 col-start-2 row-start-1">
					{days.map(({ day, month, year, isCurrentMonth }, index) => {
						const date = new Date(year, month, day);
						const todayFlag = new Date().toDateString() === date.toDateString();
						const dayName = date.toLocaleDateString('en-US', {
							weekday: 'short',
						});
						const weekend = isWeekend(day, month, year);

						return (
							<div
								key={index}
								className={`font-bold text-[#969899] ${!isCurrentMonth ? 'text-gray-400' : ''} ${
									weekend ? 'weekend' : ''
								}`}
							>
								{/* Render the heading for each day of the week */}
								<WeekHeading
									day={day}
									dayName={dayName}
									todayFlag={todayFlag}
								/>
							</div>
						);
					})}
				</div>

				{/* Holiday labels for each day */}
				<div className="grid grid-cols-7 col-start-2 row-start-2">
					{days.map(({ day, month, year }, index) => {
						const holiday = isHoliday(day, month, year);
						return (
							<div key={index} className="relative h-[40px]">
								{holiday && (
									<div className="top-[5px] z-10 absolute inset-x-0 bg-[#fff] mx-1 px-2 py-1 rounded text-ellipsis text-xs whitespace-nowrap overflow-hidden pointer-events-none">
										{holiday.localName}
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Hour grid for each day (right section) */}
				<div className="flex-grow grid grid-cols-7 grid-rows-1 col-start-2 row-start-3">
					{days.map(({ day, month, year, isCurrentMonth }, index) => {
						const date = new Date(year, month, day);
						const todayFlag = new Date().toDateString() === date.toDateString();
						const weekend = isWeekend(day, month, year);
						const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
						const dayEvents = events.filter((event) => event.date === dateKey);

						const [, drop] = useDrop({
							accept: 'event',
							drop: (item: { id: number; date: string }) => {
								handleDropEvent(item.id, dateKey);
							},
						});

						return (
							<div
								key={index}
								ref={drop}
								className={`day inner relative ${!isCurrentMonth ? 'text-gray-400' : ''} ${
									weekend ? 'weekend' : ''
								}`}
								onClick={() => handleDayClick(dateKey)}
							>
								{/* Render hour slots for the day */}
								{hours.map((_, hourIndex) => (
									<div
										key={hourIndex}
										className="relative hover:bg-slate-400 border-t border-blue-300 h-[60px] transition-colors group week-day"
									>
										{/* Current time indicator for today */}
										{todayFlag && new Date().getHours() === hourIndex && (
											<div className="z-10 absolute bg-red-500 w-full h-[2px]">
												<div className="-top-1 -left-1 absolute bg-red-500 rounded-full w-2 h-2"></div>
											</div>
										)}
									</div>
								))}

								{/* Render events for the day */}
								{dayEvents.map((event) => {
									const startTime = new Date(
										`${event.date}T${event.startTime}`,
									);
									const endTime = new Date(`${event.date}T${event.endTime}`);
									const startHour = startTime.getHours();
									const startMinutes = startTime.getMinutes();
									const endHour = endTime.getHours();
									const endMinutes = endTime.getMinutes();
									const top = ((startHour * 60 + startMinutes) / 60) * 60;
									const height =
										((endHour * 60 +
											endMinutes -
											(startHour * 60 + startMinutes)) /
											60) *
										60;

									return (
										<EventItem
											key={event.id}
											event={event}
											onClick={() => handleEventClick(event)}
											style={{ top: `${top + 5}px`, height: `${height}px` }}
										/>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>

			{/* Modal for adding new events */}
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
						clearEventData();
					}}
					buttonText="Add"
					modalRef={modalRef}
				/>
			)}

			{/* Modal for editing existing events */}
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
						clearEventData();
					}}
					buttonText="Save"
					modalRef={modalRef}
				/>
			)}

			{/* Modal for displaying event details */}
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
		</DndProvider>
	);
};

export default WeekView;
