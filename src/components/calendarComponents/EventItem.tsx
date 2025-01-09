import React from 'react';
import { useDrag } from 'react-dnd';
import { Event } from '../../types/types';

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

export default EventItem;
