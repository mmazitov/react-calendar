'use client';

// MonthHeading component to display the header row of days for a month view
const MonthHeading = () => {
	return (
		<>
			{/* Grid layout for displaying day names (Sun, Mon, Tue, etc.) */}
			<div className="gap-[5px] grid grid-cols-7">
				{/* Mapping through an array of day names to render each day in a grid column */}
				{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
					<div key={day} className="font-bold text-[#969899] text-center">
						{day} {/* Display the name of the day */}
					</div>
				))}
			</div>
		</>
	);
};

export default MonthHeading;
