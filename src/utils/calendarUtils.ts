import { ViewType } from '../components/Calendar';

export const generateDays = (
	currentYear: number,
	currentMonth: number,
	firstDayOfMonth: number,
	lastDayOfMonth: number,
	selectedWeek: number,
	viewType: ViewType,
) => {
	const daysInMonth = (year: number, month: number) =>
		new Date(year, month + 1, 0).getDate();

	const days = [];

	// Previous month days
	const prevMonthDays = daysInMonth(
		currentYear,
		currentMonth === 0 ? 11 : currentMonth - 1,
	);
	const prevMonthStartDay = prevMonthDays - firstDayOfMonth + 1;
	for (let i = prevMonthStartDay; i <= prevMonthDays; i++) {
		const month = currentMonth === 0 ? 11 : currentMonth - 1;
		const year = currentMonth === 0 ? currentYear - 1 : currentYear;
		days.push({ day: i, month, year, isCurrentMonth: false });
	}

	// Current month days
	for (let i = 1; i <= daysInMonth(currentYear, currentMonth); i++) {
		days.push({
			day: i,
			month: currentMonth,
			year: currentYear,
			isCurrentMonth: true,
		});
	}

	// Next month days
	for (let i = 1; i < 7 - lastDayOfMonth; i++) {
		const month = currentMonth === 11 ? 0 : currentMonth + 1;
		const year = currentMonth === 11 ? currentYear + 1 : currentYear;
		days.push({ day: i, month, year, isCurrentMonth: false });
	}

	// If weekly view is selected, slice the array for the selected week
	if (viewType === 'week') {
		const weekStart = selectedWeek * 7;
		return days.slice(weekStart, weekStart + 7);
	}

	return days;
};
