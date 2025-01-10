'use client';

// Importing the custom hook to access the event context
import { useEventContext } from '../context/EventContext';

const EventList: React.FC = () => {
	// Destructuring the searchQuery and filteredEvents from the EventContext
	const { searchQuery, filteredEvents } = useEventContext();

	// If there's no search query, return null (don't display anything)
	if (!searchQuery) {
		return null;
	}

	// Rendering the event list container
	return (
		<div className="top-[40px] left-0 z-10 absolute bg-white shadow-md w-full event-list">
			{/* Check if there are any filtered events */}
			{filteredEvents.length > 0 ? (
				// Loop through the filtered events and display them
				filteredEvents.map((event) => (
					<div
						key={event.id} // Using event id as the key for each event item
						className="flex justify-between border-[#f1f1f1] p-[5px] border-b-2"
					>
						{/* Display event title, date, and time */}
						<h3 className="w-[40%] break-all">{event.title}</h3>
						<p>{event.date}</p>
						<p>
							{event.startTime} - {event.endTime}
						</p>
					</div>
				))
			) : (
				// Display a message if no events are found
				<p>No events</p>
			)}
		</div>
	);
};

export default EventList;
