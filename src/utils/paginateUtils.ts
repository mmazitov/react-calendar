import { ViewType } from '../components/Calendar';

// Function to navigate to the next period (month or week)
export const nextPeriod = (
	viewType: ViewType, // Determines whether to navigate by month or week
	currentMonth: number, // Current month (0-based index)
	currentYear: number, // Current year
	selectedWeek: number, // Currently selected week (0-based index)
	setCurrentMonth: (month: number) => void, // Setter for updating the current month
	setCurrentYear: (year: number) => void, // Setter for updating the current year
	setSelectedWeek: (week: number) => void, // Setter for updating the selected week
	firstDayOfMonth: number, // Day of the week the current month starts on (0 = Sunday, 6 = Saturday)
	daysInMonth: (year: number, month: number) => number, // Function to calculate the number of days in a given month
) => {
	// Check if the view type is 'month'
	if (viewType === 'month') {
		// If currently in December, navigate to January of the next year
		if (currentMonth === 11) {
			setCurrentMonth(0);
			setCurrentYear(currentYear + 1);
		} else {
			// Otherwise, move to the next month
			setCurrentMonth(currentMonth + 1);
		}
	} else {
		// Calculate the total number of weeks in the current month
		const totalWeeks = Math.ceil(
			(firstDayOfMonth + daysInMonth(currentYear, currentMonth)) / 7,
		);

		// Check if the selected week is the last week of the current month
		if (selectedWeek === totalWeeks - 1) {
			// If in December, navigate to the first week of January in the next year
			if (currentMonth === 11) {
				setCurrentMonth(0);
				setCurrentYear(currentYear + 1);
			} else {
				// Otherwise, navigate to the first week of the next month
				setCurrentMonth(currentMonth + 1);
			}
			setSelectedWeek(0); // Reset to the first week
		} else {
			// Otherwise, move to the next week
			setSelectedWeek(selectedWeek + 1);
		}
	}
};

// Function to navigate to the previous period (month or week)
export const prevPeriod = (
	viewType: ViewType, // Determines whether to navigate by month or week
	currentMonth: number, // Current month (0-based index)
	currentYear: number, // Current year
	selectedWeek: number, // Currently selected week (0-based index)
	setCurrentMonth: (month: number) => void, // Setter for updating the current month
	setCurrentYear: (year: number) => void, // Setter for updating the current year
	setSelectedWeek: (week: number) => void, // Setter for updating the selected week
	firstDayOfMonth: number, // Day of the week the current month starts on (0 = Sunday, 6 = Saturday)
	daysInMonth: (year: number, month: number) => number, // Function to calculate the number of days in a given month
) => {
	// Check if the view type is 'month'
	if (viewType === 'month') {
		// If currently in January, navigate to December of the previous year
		if (currentMonth === 0) {
			setCurrentMonth(11);
			setCurrentYear(currentYear - 1);
		} else {
			// Otherwise, move to the previous month
			setCurrentMonth(currentMonth - 1);
		}
	} else {
		// Check if the selected week is the first week of the current month
		if (selectedWeek === 0) {
			// If in January, navigate to December of the previous year
			if (currentMonth === 0) {
				setCurrentMonth(11);
				setCurrentYear(currentYear - 1);
			} else {
				// Otherwise, navigate to the last week of the previous month
				setCurrentMonth(currentMonth - 1);
			}
			// Calculate the total number of weeks in the previous month
			const totalWeeks = Math.ceil(
				(firstDayOfMonth +
					daysInMonth(
						currentYear,
						currentMonth === 0 ? 11 : currentMonth - 1,
					)) /
					7,
			);
			setSelectedWeek(totalWeeks - 1); // Set to the last week
		} else {
			// Otherwise, move to the previous week
			setSelectedWeek(selectedWeek - 1);
		}
	}
};

// Function to navigate to today's date
export const goToToday = (
	today: Date, // The current date
	setCurrentMonth: (month: number) => void, // Setter for updating the current month
	setCurrentYear: (year: number) => void, // Setter for updating the current year
	setSelectedWeek: (week: number) => void, // Setter for updating the selected week
) => {
	// Set the current month and year to today's date
	setCurrentMonth(today.getMonth());
	setCurrentYear(today.getFullYear());

	// Calculate the day of the week for the first day of the current month
	const firstDayOfMonthToday = new Date(
		today.getFullYear(),
		today.getMonth(),
		1,
	).getDay();

	// Determine the current week number based on today's date
	const weekNumber = Math.floor(
		(firstDayOfMonthToday + today.getDate() - 1) / 7,
	);

	// Set the selected week to the calculated week number
	setSelectedWeek(weekNumber);
};
