'use client';

import { BsThreeDotsVertical } from 'react-icons/bs'; // Importing vertical dots icon
import { MdEdit, MdOutlineClose, MdOutlineDelete } from 'react-icons/md'; // Importing icons for editing, closing, and deleting
import Button from '../buttons/Button'; // Importing custom Button component

import './index.css';

interface EventInfoModalProps {
	event: {
		id: number; // The unique ID of the event
		date: string; // The date of the event (ISO format string)
		title: string; // The title of the event
		startTime: string; // The start time of the event
		endTime: string; // The end time of the event
	};
	closeModal: () => void; // Function to close the modal
	deleteEvent: () => void; // Function to delete the event
	openEditModal: () => void; // Function to open the edit modal
}

const EventInfoModal: React.FC<EventInfoModalProps> = ({
	event,
	closeModal,
	deleteEvent,
	openEditModal,
}) => {
	// Parsing the event date to extract day of the week, day, and month
	const eventDate = new Date(event.date);
	const dayOfWeek = eventDate.toLocaleString('default', { weekday: 'long' }); // Day of the week (e.g., "Monday")
	const day = eventDate.getDate(); // Day of the month
	const month = eventDate.toLocaleString('default', { month: 'long' }); // Month (e.g., "January")

	return (
		<div className="modal">
			<div className="modal-content">
				<div className="modal-header">
					<div className="modal-actions">
						{/* Button for opening the edit modal */}
						<Button
							type="button"
							value={<MdEdit />}
							onClick={openEditModal}
							variant="secondary"
							className="bg-transparent hover:bg-transparent p-0 border-none min-w-0 min-h-0"
						/>
						{/* Button for deleting the event */}
						<Button
							type="button"
							value={<MdOutlineDelete />}
							variant="secondary"
							onClick={deleteEvent}
							className="bg-transparent hover:bg-transparent p-0 border-none min-w-0 min-h-0"
						/>
						{/* Vertical dots icon (could be used for more options) */}
						<span>
							<BsThreeDotsVertical />
						</span>
						{/* Button for closing the modal */}
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
					{/* Event title */}
					<p className="font-bold text-xlg break-all capitalize">
						{event.title}
					</p>
					{/* Event details: day, date, and time range */}
					<p>
						{dayOfWeek}, {day} {month} ⋅ {event.startTime} – {event.endTime}
					</p>
				</div>
			</div>
		</div>
	);
};

export default EventInfoModal;
