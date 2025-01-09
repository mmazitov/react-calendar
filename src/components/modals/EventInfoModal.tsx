import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdEdit, MdOutlineClose, MdOutlineDelete } from 'react-icons/md';
import Button from '../buttons/Button';

import './index.css';

interface EventInfoModalProps {
	event: {
		id: number;
		date: string;
		title: string;
		startTime: string;
		endTime: string;
	};
	closeModal: () => void;
	deleteEvent: () => void;
	openEditModal: () => void;
}

const EventInfoModal: React.FC<EventInfoModalProps> = ({
	event,
	closeModal,
	deleteEvent,
	openEditModal,
}) => {
	const eventDate = new Date(event.date);
	const dayOfWeek = eventDate.toLocaleString('default', { weekday: 'long' });
	const day = eventDate.getDate();
	const month = eventDate.toLocaleString('default', { month: 'long' });

	return (
		<div className="modal">
			<div className="modal-content">
				<div className="modal-header">
					<div className="modal-actions">
						<Button
							type="button"
							value={<MdEdit />}
							onClick={openEditModal}
							variant="secondary"
							className="bg-transparent hover:bg-transparent p-0 border-none min-w-0 min-h-0"
						/>
						<Button
							type="button"
							value={<MdOutlineDelete />}
							variant="secondary"
							onClick={deleteEvent}
							className="bg-transparent hover:bg-transparent p-0 border-none min-w-0 min-h-0"
						/>
						<span>
							<BsThreeDotsVertical />
						</span>
						<Button
							type="button"
							value={<MdOutlineClose />}
							onClick={closeModal}
							variant="secondary"
							className="bg-transparent hover:bg-transparent p-0 border-none min-w-0 min-h-0"
						/>
					</div>
				</div>
				<div className="modal-info">
					<p className="font-bold text-xlg break-all capitalize">
						{event.title}
					</p>
					<p>
						{dayOfWeek}, {day} {month} ⋅ {event.startTime} – {event.endTime}
					</p>
				</div>
			</div>
		</div>
	);
};

export default EventInfoModal;
