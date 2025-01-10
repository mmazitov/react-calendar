'use client';

import { IoIosArrowDown, IoIosArrowUp, IoMdSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useEventContext } from '../../context/EventContext';
import { AppDispatch, RootState } from '../../store/store';
import { setViewType as setViewTypeAction } from '../../store/viewTypeSlice';
import { goToToday, nextPeriod, prevPeriod } from '../../utils/paginateUtils';
import Button from '../buttons/Button';
import { ViewType } from '../Calendar';
import EventList from '../EventList';
import SearchInput from '../inputs/SearchInput';
import CalendarHeading from './headings/CalendarHeading';

interface CalendarHeaderProps {
	today: Date; // The current date used for "Today" functionality
	viewType: 'month' | 'week'; // The view type (month or week)
	setViewType: (type: ViewType) => void; // Function to change the view type
	currentMonth: number; // The current month
	currentYear: number; // The current year
	setCurrentMonth: (month: number) => void; // Function to update the current month
	setCurrentYear: (year: number) => void; // Function to update the current year
	setSelectedWeek: (week: number) => void; // Function to set the selected week
	selectedWeek: number; // The selected week
	firstDayOfMonth: number; // The first day of the current month (for navigation)
	daysInMonth: (year: number, month: number) => number; // Function to get the total days in the current month
	days: any[]; // Array of days in the current month (for rendering)
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
	today,
	currentMonth,
	currentYear,
	setCurrentMonth,
	setCurrentYear,
	setSelectedWeek,
	selectedWeek,
	firstDayOfMonth,
	daysInMonth,
	days,
}) => {
	// Get the current view type from Redux
	const viewType = useSelector((state: RootState) => state.viewType.viewType);
	const dispatch = useDispatch<AppDispatch>();

	// Get the function to set the search query
	const { setSearchQuery } = useEventContext();

	// Handler for changing the view type (month or week)
	const handleViewTypeChange = (type: 'month' | 'week') => {
		dispatch(setViewTypeAction(type)); // Dispatch action to update the view type in Redux
	};

	return (
		<header className="flex justify-between items-center py-[25px] calendar-header">
			{/* Navigation Buttons for "Today" and period change */}
			<div className="flex items-center gap-[5px] buttons-holder">
				<Button
					type="button"
					value="Today" // Button label
					onClick={
						() =>
							goToToday(today, setCurrentMonth, setCurrentYear, setSelectedWeek) // Navigate to today's date
					}
				/>
				<Button
					type="button"
					value={<IoIosArrowUp />} // Up arrow icon
					onClick={
						() =>
							prevPeriod(
								viewType,
								currentMonth,
								currentYear,
								selectedWeek,
								setCurrentMonth,
								setCurrentYear,
								setSelectedWeek,
								firstDayOfMonth,
								daysInMonth,
							) // Navigate to the previous period (week/month)
					}
				/>
				<Button
					type="button"
					value={<IoIosArrowDown />} // Down arrow icon
					onClick={
						() =>
							nextPeriod(
								viewType,
								currentMonth,
								currentYear,
								selectedWeek,
								setCurrentMonth,
								setCurrentYear,
								setSelectedWeek,
								firstDayOfMonth,
								daysInMonth,
							) // Navigate to the next period (week/month)
					}
				/>
			</div>

			{/* Calendar Heading with Month/Year */}
			<CalendarHeading
				currentYear={currentYear}
				currentMonth={currentMonth}
				days={days}
				viewType={viewType}
			/>

			{/* Search Input and View Toggle Buttons */}
			<div className="relative flex items-stretch gap-[5px]">
				{/* Search input to filter events */}
				<SearchInput
					inputPaceholder="Search" // Placeholder text for the search input
					inputButtonValue={<IoMdSearch />} // Search icon
					onSearchChange={(value) => setSearchQuery(value)} // Set the search query in the context
				/>

				{/* Event list (not fully defined here) */}
				<EventList />

				{/* View toggle buttons (Month/Week view) */}
				<div className="flex items-stretch gap-[5px]">
					<Button
						type="button"
						value="Month" // Month view button
						onClick={() => handleViewTypeChange('month')} // Set the view to "month"
						className={`${viewType === 'month' ? 'active' : ''}`} // Active class for the current view
					/>
					<Button
						type="button"
						value="Week" // Week view button
						variant="primary"
						onClick={() => handleViewTypeChange('week')} // Set the view to "week"
						className={`${viewType === 'week' ? 'active' : ''}`} // Active class for the current view
					/>
				</div>
			</div>
		</header>
	);
};

export default CalendarHeader;
