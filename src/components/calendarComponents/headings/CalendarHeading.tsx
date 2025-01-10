'use client';

interface CalendarHeadingProps {
	currentYear: number;
	currentMonth: number;
	days: any[];
	viewType: 'month' | 'week';
}

const CalendarHeading: React.FC<CalendarHeadingProps> = ({
	currentYear,
	currentMonth,
	days,
	viewType,
}) => {
	const getHeaderText = () => {
		if (viewType === 'month') {
			return new Date(currentYear, currentMonth).toLocaleString('default', {
				month: 'long',
				year: 'numeric',
			});
		} else {
			const firstDay = new Date(days[0].year, days[0].month, days[0].day);
			const lastDay = new Date(days[6].year, days[6].month, days[6].day);

			return `${firstDay.toLocaleDateString('default', { month: 'long', day: 'numeric' })} - ${lastDay.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}`;
		}
	};

	return <h2 className="font-bold">{getHeaderText()}</h2>;
};

export default CalendarHeading;
