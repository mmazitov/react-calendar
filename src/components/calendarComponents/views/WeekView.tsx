import { Day, Holiday } from '../../../types/types';
import WeekHeading from '../headings/WeekHeading';
import './index.css';

interface WeekViewProps {
	days: Day[];
	isHoliday: (day: number, month: number, year: number) => Holiday | undefined;
	isWeekend: (day: number, month: number, year: number) => boolean;
}

const WeekView: React.FC<WeekViewProps> = ({ days, isHoliday, isWeekend }) => {
	const hours = Array.from({ length: 24 }, (_, i) => {
		return i.toString().padStart(2, '0') + ':00';
	});
	return (
		<div className="justify-start grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] min-h-screen week">
			{/* Time scale */}
			<div className="flex flex-col col-start-1 row-span-2 w-[60px]">
				<div className="h-[60px]"></div>{' '}
				{/* Empty space to align with headings */}
				{hours.map((hour, index) => (
					<div
						key={index}
						className="relative text-right border-gray-200 bg-[#fff] pr-2 border-r h-[60px] text-gray-500 text-sm"
					>
						<span className="relative top-[-10px]">{hour}</span>
					</div>
				))}
			</div>

			{/* Day grid */}
			<div className="grid grid-cols-7 col-start-2 row-start-1">
				{/* Day headers */}
				{days.map(({ day, month, year, isCurrentMonth }, index) => {
					const date = new Date(year, month, day);
					const todayFlag = new Date().toDateString() === date.toDateString();
					const dayName = date.toLocaleDateString('en-US', {
						weekday: 'short',
					});
					const weekend = isWeekend(day, month, year);

					return (
						<div
							key={index}
							className={`font-bold text-[#969899] ${!isCurrentMonth ? 'text-gray-400' : ''} ${
								weekend ? 'weekend' : ''
							}`}
						>
							<WeekHeading day={day} dayName={dayName} todayFlag={todayFlag} />
						</div>
					);
				})}
			</div>

			{/* Hour grid for each day */}
			<div className="flex-grow grid grid-cols-7 grid-rows-1">
				{days.map(({ day, month, year, isCurrentMonth }, index) => {
					const date = new Date(year, month, day);
					const todayFlag = new Date().toDateString() === date.toDateString();
					const holiday = isHoliday(day, month, year);
					const weekend = isWeekend(day, month, year);

					return (
						<div
							key={index}
							className={`day inner relative ${!isCurrentMonth ? 'text-gray-400' : ''} ${
								weekend ? 'weekend' : ''
							}`}
						>
							{/* Holiday section */}
							{holiday && (
								<div className="top-[5px] z-10 absolute inset-x-0 bg-[#fff] mx-1 px-2 py-1 rounded text-ellipsis text-xs whitespace-nowrap overflow-hidden">
									{holiday.localName}
								</div>
							)}
							{/* Hour grid for each day */}
							{hours.map((_, hourIndex) => (
								<div
									key={hourIndex}
									className="relative hover:bg-slate-400 border-t border-blue-300 h-[60px] transition-colors group week-day"
								>
									{/* Current time indicator */}
									{todayFlag && new Date().getHours() === hourIndex && (
										<div className="z-10 absolute bg-red-500 w-full h-[2px]">
											<div className="-top-1 -left-1 absolute bg-red-500 rounded-full w-2 h-2"></div>
										</div>
									)}

									{/* Event area */}
									{/* <div className="group-hover:bg-gray-50 absolute inset-0"></div> */}
								</div>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default WeekView;
