'use client';

// Importing necessary modules and components
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { EventProvider } from '../context/EventContext';
import useFetchHolidays from '../hooks/useFetchHolidays';
import { AppDispatch, RootState } from '../store/store';
import { setViewType as setViewTypeAction } from '../store/viewTypeSlice';
import {
	setCurrentMonth,
	setCurrentYear,
	setSelectedWeek,
} from '../store/weekSlice';
import { generateDays } from '../utils/calendarUtils';
import { isHoliday, isToday, isWeekend } from '../utils/dayUtils';
import CalendarHeader from './calendarComponents/CalendarHeader';
import MonthView from './calendarComponents/views/MonthView';
import WeekView from './calendarComponents/views/WeekView';

export type ViewType = 'month' | 'week';

const Calendar: React.FC = () => {
	// Get the current date
	const today = new Date();
	const dispatch = useDispatch<AppDispatch>();

	// Get the current view type, month, year, and selected week from Redux store
	const viewType = useSelector((state: RootState) => state.viewType.viewType);
	const currentMonth = useSelector(
		(state: RootState) => state.week.currentMonth,
	);
	const currentYear = useSelector((state: RootState) => state.week.currentYear);
	const selectedWeek = useSelector(
		(state: RootState) => state.week.selectedWeek,
	);
	// Fetch holidays based on the current year
	const { holidays } = useFetchHolidays(currentYear);

	// Function to calculate the number of days in a month
	const daysInMonth = (year: number, month: number) =>
		new Date(year, month + 1, 0).getDate();

	// Get the first and last days of the current month
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
	const lastDayOfMonth = new Date(
		currentYear,
		currentMonth,
		daysInMonth(currentYear, currentMonth),
	).getDay();

	// Generate the days for the calendar based on the current month, selected week, and view type
	const days = generateDays(
		currentYear,
		currentMonth,
		firstDayOfMonth,
		lastDayOfMonth,
		selectedWeek,
		viewType,
	);

	// Function to check if a given day is a holiday
	const holidayWrapper = (day: number, month: number, year: number) =>
		isHoliday(day, month, year, holidays);

	// Render the content for the month view
	const renderMonthViewContent = () => {
		return (
			<MonthView
				days={days}
				isHoliday={holidayWrapper}
				isWeekend={isWeekend}
				isToday={isToday}
			/>
		);
	};

	// Render the content for the week view
	const renderWeekViewContent = () => {
		return (
			<WeekView days={days} isHoliday={holidayWrapper} isWeekend={isWeekend} />
		);
	};

	// The Calendar component's return statement
	return (
		<EventProvider>
			<div className="pb-[25px] calendar">
				{/* Calendar header with controls for changing the view type, month, year, and week */}
				<CalendarHeader
					today={today}
					viewType={viewType}
					setViewType={(type: ViewType) => dispatch(setViewTypeAction(type))}
					currentMonth={currentMonth}
					currentYear={currentYear}
					setCurrentMonth={(month: number) => dispatch(setCurrentMonth(month))}
					setCurrentYear={(year: number) => dispatch(setCurrentYear(year))}
					setSelectedWeek={(week: number) => dispatch(setSelectedWeek(week))}
					selectedWeek={selectedWeek}
					firstDayOfMonth={firstDayOfMonth}
					daysInMonth={daysInMonth}
					days={days}
				/>
				{/* Drag and drop provider for the calendar */}
				<DndProvider backend={HTML5Backend}>
					{/* Conditionally render either Month or Week view based on the selected view type */}
					{viewType === 'month'
						? renderMonthViewContent()
						: renderWeekViewContent()}
				</DndProvider>
			</div>
		</EventProvider>
	);
};

export default Calendar;
