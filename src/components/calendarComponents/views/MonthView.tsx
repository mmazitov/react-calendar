'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEventHandlers } from '../../../hooks/useEventHandlers';
import { Day, Holiday } from '../../../types/types';
import EventInfoModal from '../../modals/EventInfoModal';
import EventModal from '../../modals/EventModal';
import DayCell from '../DayCell';
import MonthHeading from '../headings/MonthHeading';
import './index.css';

// Component props definition
interface MonthViewProps {
	days: Day[]; // Array of days to render
	isHoliday: (day: number, month: number, year: number) => Holiday | undefined; // Function to check if the day is a holiday
	isWeekend: (day: number, month: number, year: number) => boolean; // Function to check if the day is a weekend
	isToday: (day: number, month: number, year: number) => boolean; // Function to check if the day is today
}

// MonthView component
const MonthView: React.FC<MonthViewProps> = ({
	days,
	isWeekend,
	isHoliday,
	isToday,
}) => {
	// Destructure event handlers from custom hook
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

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="flex-grow calendar-grid">
				{/* Month Heading */}
				<MonthHeading />

				{/* Grid of days in the month */}
				<div className="gap-[5px] grid grid-cols-7 auto-rows-fr h-[calc(100vh-139px)] min-h-[425px] month">
					{/* Render each day cell */}
					{days.map((day, index) => {
						// Filter events for the current day
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

				{/* Modal for adding a new event */}
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

				{/* Modal for editing an event */}
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

				{/* Modal for displaying event info (when not in editing mode) */}
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
