import { ViewType } from '../components/Calendar';

// Function to generate days for the current month view
export const generateDays = (
	currentYear: number, // Current year (e.g., 2024)
	currentMonth: number, // Current month (0-based index: 0 = January, 11 = December)
	firstDayOfMonth: number, // The day of the week the month starts on (0 = Sunday, 6 = Saturday)
	lastDayOfMonth: number, // The day of the week the month ends on (0 = Sunday, 6 = Saturday)
	selectedWeek: number, // The selected week for the 'week' view (0-based index)
	viewType: ViewType, // The current view type ('month' or 'week')
) => {
	// Helper function to get the number of days in a specific month
	const daysInMonth = (year: number, month: number) =>
		new Date(year, month + 1, 0).getDate(); // Get the last day of the month

	const days = []; // Array to store the generated days

	// Handle the previous month's days (for the first week)
	const prevMonthDays = daysInMonth(
		currentYear,
		currentMonth === 0 ? 11 : currentMonth - 1, // Adjust for January (0) being the previous month
	);
	const prevMonthStartDay = prevMonthDays - firstDayOfMonth + 1;
	// Loop through and add the days from the previous month
	for (let i = prevMonthStartDay; i <= prevMonthDays; i++) {
		const month = currentMonth === 0 ? 11 : currentMonth - 1; // Adjust for January
		const year = currentMonth === 0 ? currentYear - 1 : currentYear; // Adjust for previous year in January
		days.push({ day: i, month, year, isCurrentMonth: false }); // Mark as not current month
	}

	// Handle the current month's days
	for (let i = 1; i <= daysInMonth(currentYear, currentMonth); i++) {
		days.push({
			day: i,
			month: currentMonth, // Current month
			year: currentYear, // Current year
			isCurrentMonth: true, // Mark as current month
		});
	}

	// Handle the next month's days (for the last week)
	for (let i = 1; i < 7 - lastDayOfMonth; i++) {
		const month = currentMonth === 11 ? 0 : currentMonth + 1; // Adjust for December being the next month
		const year = currentMonth === 11 ? currentYear + 1 : currentYear; // Adjust for next year in December
		days.push({ day: i, month, year, isCurrentMonth: false }); // Mark as not current month
	}

	// If the view is 'week', slice the array to return only the selected week
	if (viewType === 'week') {
		const weekStart = selectedWeek * 7; // Calculate the starting index of the selected week
		return days.slice(weekStart, weekStart + 7); // Return the days for the selected week
	}

	return days; // Return all days for the month view
};
