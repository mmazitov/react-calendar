'use client';

// WeekHeading component to display the day information for a week
const WeekHeading = ({
	day, // The day number (e.g., 1, 2, 3...)
	dayName, // The name of the day (e.g., Monday, Tuesday)
	todayFlag, // Flag to check if the current day is today
}: {
	day: number;
	dayName: string;
	todayFlag: boolean;
}) => {
	return (
		<div
			className={`h-[60px] p-2 text-center bg-inherit ${todayFlag ? 'bg-blue-50' : ''}`} // Apply styles, add background color if today
		>
			{/* Display day name with conditional text color */}
			<div className={`text-sm ${todayFlag ? 'text-blue-600' : ''}`}>
				{dayName}
			</div>
			{/* Display day number with larger font and conditional color if today */}
			<div
				className={`text-lg font-semibold ${todayFlag ? 'text-blue-600' : ''}`}
			>
				{day}
			</div>
		</div>
	);
};

export default WeekHeading;
