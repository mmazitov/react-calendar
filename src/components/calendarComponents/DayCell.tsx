import React from 'react';
import { useDrop } from 'react-dnd';
import { Day, Event, Holiday } from '../../types/types';
import EventItem from './EventItem';

interface DayCellProps {
	day: Day;
	events: Event[];
	isHoliday: (day: number, month: number, year: number) => Holiday | undefined;
	isWeekend: (day: number, month: number, year: number) => boolean;
	isToday: (day: number, month: number, year: number) => boolean;
	onDropEvent: (eventId: number, newDate: string) => void;
	onDayClick: (date: string) => void;
	onEventClick: (event: Event) => void;
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
	const dateKey = `${day.year}-${String(day.month + 1).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`;

	const [, drop] = useDrop({
		accept: 'event',
		drop: (item: { id: number; date: string }) => {
			onDropEvent(item.id, dateKey);
		},
	});

	const holiday = isHoliday(day.day, day.month, day.year);
	const weekend = isWeekend(day.day, day.month, day.year);
	const today = isToday(day.day, day.month, day.year);

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
			className={`day relative hover:bg-slate-400 transition-colors min-h-[80px] ${weekend ? 'weekend' : ''} ${today ? 'today' : ''}  ${
				day.isCurrentMonth ? '' : 'outer'
			}`}
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
						style={{}}
					/>
				))}
			</div>
		</div>
	);
};

export default DayCell;
