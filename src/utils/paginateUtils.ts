import { ViewType } from '../components/Calendar';

export const nextPeriod = (
	viewType: ViewType,
	currentMonth: number,
	currentYear: number,
	selectedWeek: number,
	setCurrentMonth: (month: number) => void,
	setCurrentYear: (year: number) => void,
	setSelectedWeek: (week: number) => void,
	firstDayOfMonth: number,
	daysInMonth: (year: number, month: number) => number,
) => {
	if (viewType === 'month') {
		if (currentMonth === 11) {
			setCurrentMonth(0);
			setCurrentYear(currentYear + 1);
		} else {
			setCurrentMonth(currentMonth + 1);
		}
	} else {
		const totalWeeks = Math.ceil(
			(firstDayOfMonth + daysInMonth(currentYear, currentMonth)) / 7,
		);

		if (selectedWeek === totalWeeks - 1) {
			if (currentMonth === 11) {
				setCurrentMonth(0);
				setCurrentYear(currentYear + 1);
			} else {
				setCurrentMonth(currentMonth + 1);
			}
			setSelectedWeek(0);
		} else {
			setSelectedWeek(selectedWeek + 1);
		}
	}
};

export const prevPeriod = (
	viewType: ViewType,
	currentMonth: number,
	currentYear: number,
	selectedWeek: number,
	setCurrentMonth: (month: number) => void,
	setCurrentYear: (year: number) => void,
	setSelectedWeek: (week: number) => void,
	firstDayOfMonth: number,
	daysInMonth: (year: number, month: number) => number,
) => {
	if (viewType === 'month') {
		if (currentMonth === 0) {
			setCurrentMonth(11);
			setCurrentYear(currentYear - 1);
		} else {
			setCurrentMonth(currentMonth - 1);
		}
	} else {
		if (selectedWeek === 0) {
			if (currentMonth === 0) {
				setCurrentMonth(11);
				setCurrentYear(currentYear - 1);
			} else {
				setCurrentMonth(currentMonth - 1);
			}
			const totalWeeks = Math.ceil(
				(firstDayOfMonth +
					daysInMonth(
						currentYear,
						currentMonth === 0 ? 11 : currentMonth - 1,
					)) /
					7,
			);
			setSelectedWeek(totalWeeks - 1);
		} else {
			setSelectedWeek(selectedWeek - 1);
		}
	}
};

export const goToToday = (
	today: Date,
	setCurrentMonth: (month: number) => void,
	setCurrentYear: (year: number) => void,
	setSelectedWeek: (week: number) => void,
) => {
	setCurrentMonth(today.getMonth());
	setCurrentYear(today.getFullYear());
	const firstDayOfMonthToday = new Date(
		today.getFullYear(),
		today.getMonth(),
		1,
	).getDay();
	const weekNumber = Math.floor(
		(firstDayOfMonthToday + today.getDate() - 1) / 7,
	);

	setSelectedWeek(weekNumber);
};
