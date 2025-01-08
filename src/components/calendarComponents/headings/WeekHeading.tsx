'use client';

const WeekHeading = ({
	day,
	dayName,
	todayFlag,
}: {
	day: number;
	dayName: string;
	todayFlag: boolean;
}) => {
	return (
		<div
			className={`h-[60px] p-2 text-center bg-inherit ${todayFlag ? 'bg-blue-50' : ''}`}
		>
			<div className={`text-sm ${todayFlag ? 'text-blue-600' : ''}`}>
				{dayName}
			</div>
			<div
				className={`text-lg font-semibold ${todayFlag ? 'text-blue-600' : ''}`}
			>
				{day}
			</div>
		</div>
	);
};

export default WeekHeading;
