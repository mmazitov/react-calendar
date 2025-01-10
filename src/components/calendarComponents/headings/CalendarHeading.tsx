'use client';

interface CalendarHeadingProps {
	currentYear: number; // The current year to display in the heading
	currentMonth: number; // The current month to display in the heading
	days: any[]; // Array of days (used for week view)
	viewType: 'month' | 'week'; // Determines whether to display month or week view
}

// CalendarHeading component to display the appropriate header text based on the view type (month or week)
const CalendarHeading: React.FC<CalendarHeadingProps> = ({
	currentYear,
	currentMonth,
	days,
	viewType,
}) => {
	// Function to generate the appropriate header text based on the current view (month or week)
	const getHeaderText = () => {
		if (viewType === 'month') {
			// For month view, display the full month and year
			return new Date(currentYear, currentMonth).toLocaleString('default', {
				month: 'long', // Full month name (e.g., January, February)
				year: 'numeric', // Year in numeric format (e.g., 2025)
			});
		} else {
			// For week view, display the range of dates (e.g., Jan 1 - Jan 7, 2025)
			const firstDay = new Date(days[0].year, days[0].month, days[0].day);
			const lastDay = new Date(days[6].year, days[6].month, days[6].day);

			return `${firstDay.toLocaleDateString('default', { month: 'long', day: 'numeric' })} - ${lastDay.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}`;
		}
	};

	return <h2 className="font-bold">{getHeaderText()}</h2>;
};

export default CalendarHeading;
