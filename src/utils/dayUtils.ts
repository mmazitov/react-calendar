import { Holiday } from '../types/types';

export const isWeekend = (
	day: number,
	month: number,
	year: number,
): boolean => {
	const date = new Date(year, month, day);
	return date.getDay() === 0 || date.getDay() === 6;
};

export const isHoliday = (
	day: number,
	month: number,
	year: number,
	holidays: Holiday[],
): Holiday | undefined => {
	const dateStr = new Date(year, month, day).toLocaleDateString('en-CA');
	return holidays.find((holiday) => holiday.date === dateStr);
};

export const isToday = (day: number, month: number, year: number): boolean => {
	const today = new Date();
	return (
		day === today.getDate() &&
		month === today.getMonth() &&
		year === today.getFullYear()
	);
};
