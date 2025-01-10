'use client';

import Button from '../buttons/Button';
import Input from '../inputs/Input';
import Select from '../select/Select';
import './index.css';

interface EventModalProps {
	selectedDate: string | null; // The selected date for the event
	newEventTitle: string; // The title of the new event
	newEventStartTime: string; // The start time of the new event
	newEventEndTime: string; // The end time of the new event
	setNewEventTitle: (title: string) => void; // Function to update the event title
	setNewEventStartTime: (time: string) => void; // Function to update the event start time
	setNewEventEndTime: (time: string) => void; // Function to update the event end time
	setNewEventDate: (date: string) => void; // Function to update the event date
	addEvent: () => void; // Function to add the event
	closeModal: () => void; // Function to close the modal
	buttonText: string; // Text for the button ('Add' or 'Save')
	modalRef: React.RefObject<HTMLDivElement>; // Ref for the modal element
}

const EventModal: React.FC<EventModalProps> = ({
	selectedDate,
	newEventTitle,
	newEventStartTime,
	newEventEndTime,
	setNewEventTitle,
	setNewEventStartTime,
	setNewEventEndTime,
	setNewEventDate,
	addEvent,
	closeModal,
	buttonText,
	modalRef,
}) => {
	// Generate time options in 15-minute intervals (24 hours)
	const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
		const hours = String(Math.floor(i / 4)).padStart(2, '0');
		const minutes = String((i % 4) * 15).padStart(2, '0');
		return { value: `${hours}:${minutes}`, label: `${hours}:${minutes}` };
	});

	// Filter end time options to ensure the end time is after the start time
	const filteredEndTimeOptions = timeOptions.filter((option) => {
		if (!newEventStartTime) return true; // If no start time, allow all end times
		const [startHours, startMinutes] = (newEventStartTime as string)
			.split(':')
			.map(Number);
		const [endHours, endMinutes] = option.value.split(':').map(Number);
		return (
			endHours > startHours ||
			(endHours === startHours && endMinutes > startMinutes)
		);
	});

	return (
		<div className="modal" ref={modalRef}>
			<div className="modal-content">
				{/* Modal Title */}
				<div className="flex justify-start items-center modal-title">
					<h3>
						{buttonText === 'Add'
							? `Add event to ${selectedDate}`
							: `Edit event on `}
					</h3>
					{/* Show date input if editing event */}
					{buttonText === 'Save' && (
						<Input
							type="date"
							value={selectedDate || ''}
							onChange={(e) => setNewEventDate(e.target.value)}
							className=""
							inputPlaceholder="Event date"
						/>
					)}
				</div>
				<form action="">
					{/* Event Title Input */}
					<Input
						inputPlaceholder="Event name"
						value={newEventTitle}
						onChange={(e) => setNewEventTitle(e.target.value)}
						className="input"
						required={true}
					/>
					{/* Time Selection for Start and End Time */}
					<div className="flex justify-between items-center gap-2 time-wrapper">
						<Select
							options={timeOptions}
							value={newEventStartTime}
							onChange={(time) => setNewEventStartTime(time as string)}
							placeholder="Start time"
							className="w-full"
							required={true}
						/>
						<span> - </span>
						<Select
							options={filteredEndTimeOptions}
							value={newEventEndTime}
							onChange={(time) => setNewEventEndTime(time as string)}
							placeholder="End time"
							className="w-full"
							required={true}
						/>
					</div>
					{/* Modal Actions (Add/Cancel Buttons) */}
					<div className="mt-[10px] modal-actions">
						<Button type="submit" value={buttonText} onClick={addEvent} />
						<Button type="submit" value="Cancel" onClick={closeModal} />
					</div>
				</form>
			</div>
		</div>
	);
};

export default EventModal;
