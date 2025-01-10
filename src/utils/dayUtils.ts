import { Holiday } from '../types/types';

// Function to check if a given day is a weekend
export const isWeekend = (
	day: number, // Day of the month (1-31)
	month: number, // Month (0-based index: 0 = January, 11 = December)
	year: number, // Year (e.g., 2024)
): boolean => {
	const date = new Date(year, month, day); // Create a Date object for the given day
	// Check if the day is Saturday (6) or Sunday (0)
	return date.getDay() === 0 || date.getDay() === 6;
};

// Function to check if a given day is a holiday
export const isHoliday = (
	day: number, // Day of the month (1-31)
	month: number, // Month (0-based index: 0 = January, 11 = December)
	year: number, // Year (e.g., 2024)
	holidays: Holiday[], // Array of holidays with their date and name
): Holiday | undefined => {
	// Format the date to 'YYYY-MM-DD' (ISO format for easier comparison)
	const dateStr = new Date(year, month, day).toLocaleDateString('en-CA');
	// Find and return the holiday that matches the given date, if it exists
	return holidays.find((holiday) => holiday.date === dateStr);
};

// Function to check if a given day is today's date
export const isToday = (
	day: number, // Day of the month (1-31)
	month: number, // Month (0-based index: 0 = January, 11 = December)
	year: number, // Year (e.g., 2024)
): boolean => {
	const today = new Date(); // Get today's date
	// Check if the day, month, and year match today's date
	return (
		day === today.getDate() &&
		month === today.getMonth() &&
		year === today.getFullYear()
	);
};
