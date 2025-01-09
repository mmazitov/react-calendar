import React from 'react';
import { useDrag } from 'react-dnd';
import { Event } from '../../types/types';

interface EventItemProps {
	event: Event;
	onClick: () => void;
	style: React.CSSProperties;
}

const EventItem: React.FC<EventItemProps> = ({ event, onClick, style }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'event',
		item: { id: event.id, date: event.date },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	return (
		<div
			ref={drag}
			className="right-0 left-0 absolute bg-blue-200 p-[5px] rounded-[5px] break-all cursor-pointer"
			style={{ ...style, opacity: isDragging ? 0.5 : 1 }}
			onClick={onClick}
		>
			{event.title}
		</div>
	);
};

export default EventItem;
