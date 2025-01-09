import React from 'react';
import Button from '../buttons/Button';
import Input from '../inputs/Input';
import Select from '../select/Select';
import './index.css';

interface EventModalProps {
	selectedDate: string | null;
	newEventTitle: string;
	newEventStartTime: string;
	newEventEndTime: string;
	setNewEventTitle: (title: string) => void;
	setNewEventStartTime: (time: string) => void;
	setNewEventEndTime: (time: string) => void;
	setNewEventDate: (date: string) => void;
	addEvent: () => void;
	closeModal: () => void;
	buttonText: string;
	modalRef: React.RefObject<HTMLDivElement>;
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
	const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
		const hours = String(Math.floor(i / 4)).padStart(2, '0');
		const minutes = String((i % 4) * 15).padStart(2, '0');
		return { value: `${hours}:${minutes}`, label: `${hours}:${minutes}` };
	});

	const filteredEndTimeOptions = timeOptions.filter((option) => {
		if (!newEventStartTime) return true;
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
				<div className="flex justify-start items-center modal-title">
					<h3>
						{buttonText === 'Add'
							? `Add event to ${selectedDate}`
							: `Edit event on `}
					</h3>
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
					<Input
						inputPlaceholder="Event name"
						value={newEventTitle}
						onChange={(e) => setNewEventTitle(e.target.value)}
						className="input"
						required={true}
					/>
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
