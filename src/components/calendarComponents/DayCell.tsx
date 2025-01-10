'use client';

import { useDrop } from 'react-dnd'; // Importing the useDrop hook from react-dnd for drop functionality
import { Day, Event, Holiday } from '../../types/types'; // Importing the Day, Event, and Holiday types
import EventItem from './EventItem'; // Importing the EventItem component to display events within the day cell

// Defining the props interface for the DayCell component
interface DayCellProps {
	day: Day; // Day object representing the current day in the calendar
	events: Event[]; // Array of events scheduled for this day
	isHoliday: (day: number, month: number, year: number) => Holiday | undefined; // Function to check if the day is a holiday
	isWeekend: (day: number, month: number, year: number) => boolean; // Function to check if the day is a weekend
	isToday: (day: number, month: number, year: number) => boolean; // Function to check if the day is today's date
	onDropEvent: (eventId: number, newDate: string) => void; // Function that handles dropping an event on a new day
	onDayClick: (date: string) => void; // Function that handles clicking a day cell
	onEventClick: (event: Event) => void; // Function that handles clicking an event
}

const DayCell: React.FC<DayCellProps> = ({
	day,
	events,
	isHoliday,
	isWeekend,
	isToday,
	onDropEvent,
	onDayClick,
	onEventClick,
}) => {
	// Constructing a date key in the format 'YYYY-MM-DD' for this day cell
	const dateKey = `${day.year}-${String(day.month + 1).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`;

	// Setting up the drop functionality using react-dnd's useDrop hook
	const [, drop] = useDrop({
		accept: 'event', // Only items of type 'event' can be dropped here
		drop: (item: { id: number; date: string }) => {
			// When an event is dropped, the onDropEvent function is called to handle the event's new date
			onDropEvent(item.id, dateKey);
		},
	});

	// Check if the day is a holiday
	const holiday = isHoliday(day.day, day.month, day.year);
	// Check if the day is a weekend
	const weekend = isWeekend(day.day, day.month, day.year);
	// Check if the day is today's date
	const today = isToday(day.day, day.month, day.year);

	// Check if the current day is the first day of the month
	const isFirstDayOfMonth = day.day === 1;
	// Get the abbreviated month name if it's the first day of the month
	const monthName = isFirstDayOfMonth
		? new Date(day.year, day.month).toLocaleString('default', {
				month: 'short',
			})
		: '';

	// Calculate the total number of events for this day (including holidays)
	const totalEvents = (holiday ? 1 : 0) + events.length;

	return (
		<div
			ref={drop} // Attach the drop functionality to this div element
			className={`day relative hover:bg-slate-400 transition-colors min-h-[80px] ${weekend ? 'weekend' : ''} ${today ? 'today' : ''}  ${
				day.isCurrentMonth ? '' : 'outer'
			}`}
			onClick={() => onDayClick(dateKey)} // Handle clicking the day cell
		>
			<div className="flex items-center gap-[1px] mb-[3px] day-heading">
				{isFirstDayOfMonth && <strong>{monthName} </strong>}{' '}
				{/* Show the month name if it's the first day of the month */}
				<strong>{day.day}</strong> {/* Display the day number */}
				{totalEvents > 0 && (
					<span className="text-[#000] text-xs">
						{totalEvents} {totalEvents > 1 ? 'events' : 'event'}{' '}
						{/* Display the number of events for this day */}
					</span>
				)}
			</div>
			<div className="flex flex-col gap-2 day-event">
				{/* If there's a holiday, display the holiday's local name */}
				{holiday && (
					<small className="block bg-[#ffffff] p-[5px] rounded-[5px]">
						{holiday.localName}
					</small>
				)}
				{/* Display the events for this day */}
				{events.map((event) => (
					<EventItem
						key={event.id} // Use the event id as the key for each EventItem
						event={event} // Pass the event data
						onClick={() => onEventClick(event)} // Call the onEventClick function when the event is clicked
						style={{}} // Style can be passed as needed
					/>
				))}
			</div>
		</div>
	);
};

export default DayCell;
