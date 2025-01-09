import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
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
	const today = new Date();
	const dispatch = useDispatch<AppDispatch>();

	const viewType = useSelector((state: RootState) => state.viewType.viewType);
	const currentMonth = useSelector(
		(state: RootState) => state.week.currentMonth,
	);
	const currentYear = useSelector((state: RootState) => state.week.currentYear);
	const selectedWeek = useSelector(
		(state: RootState) => state.week.selectedWeek,
	);
	const { holidays } = useFetchHolidays(currentYear);

	const daysInMonth = (year: number, month: number) =>
		new Date(year, month + 1, 0).getDate();
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
	const lastDayOfMonth = new Date(
		currentYear,
		currentMonth,
		daysInMonth(currentYear, currentMonth),
	).getDay();

	const days = generateDays(
		currentYear,
		currentMonth,
		firstDayOfMonth,
		lastDayOfMonth,
		selectedWeek,
		viewType,
	);

	const holidayWrapper = (day: number, month: number, year: number) =>
		isHoliday(day, month, year, holidays);

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

	const renderWeekViewContent = () => {
		return (
			<WeekView days={days} isHoliday={holidayWrapper} isWeekend={isWeekend} />
		);
	};

	return (
		<div className="pb-[25px] calendar">
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
			<DndProvider backend={HTML5Backend}>
				{viewType === 'month'
					? renderMonthViewContent()
					: renderWeekViewContent()}
			</DndProvider>
		</div>
	);
};

export default Calendar;
