import React from 'react';
import { useEventContext } from '../context/EventContext';

const EventList: React.FC = () => {
	const { searchQuery, filteredEvents } = useEventContext();

	if (!searchQuery) {
		return null;
	}
	return (
		<div className="top-[40px] left-0 z-10 absolute bg-white shadow-md w-full event-list">
			{filteredEvents.length > 0 ? (
				filteredEvents.map((event) => (
					<div
						key={event.id}
						className="flex justify-between border-[#f1f1f1] p-[5px] border-b-2"
					>
						<h3 className="w-[40%] break-all">{event.title}</h3>
						<p>{event.date}</p>
						<p>
							{event.startTime} - {event.endTime}
						</p>
					</div>
				))
			) : (
				<p>Никакие события не найдены</p>
			)}
		</div>
	);
};

export default EventList;
