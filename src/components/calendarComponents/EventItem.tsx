'use client';

import { useDrag } from 'react-dnd'; // Importing the useDrag hook from react-dnd for drag-and-drop functionality
import { Event } from '../../types/types'; // Importing the Event type to type-check the event prop

// Defining the props interface for the EventItem component
interface EventItemProps {
	event: Event; // The event object that contains event data like title, date, etc.
	onClick: () => void; // The function that handles the click event
	style: React.CSSProperties; // Optional styles for the component
}

const EventItem: React.FC<EventItemProps> = ({ event, onClick, style }) => {
	// Destructuring from the useDrag hook to manage the dragging state and reference
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'event', // Defining the type of item being dragged
		item: { id: event.id, date: event.date }, // The data associated with the dragged item (event's id and date)
		collect: (monitor) => ({
			isDragging: monitor.isDragging(), // Collecting the dragging state to change the appearance of the item
		}),
	}));

	return (
		<div
			ref={drag} // Attaching the drag functionality to this div element
			className="left-[5px] absolute bg-blue-200 p-[5px] rounded-[5px] w-[calc(100%-10px)] text-sm break-all cursor-pointer" // Tailwind CSS classes for styling
			style={{ ...style, opacity: isDragging ? 0.5 : 1 }} // Applying dynamic styles, adjusting opacity when dragging
			onClick={(e) => {
				e.stopPropagation(); // Preventing the event from propagating to parent elements
				onClick(); // Calling the onClick function passed from the parent
			}}
		>
			{event.title} {/* Displaying the event title */}
		</div>
	);
};

export default EventItem;
