'use client';

const MonthHeading = () => {
	return (
		<>
			<div className="gap-[5px] grid grid-cols-7">
				{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
					<div key={day} className="font-bold text-[#969899] text-center">
						{day}
					</div>
				))}
			</div>
		</>
	);
};

export default MonthHeading;
