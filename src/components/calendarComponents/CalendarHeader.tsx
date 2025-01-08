import { IoIosArrowDown, IoIosArrowUp, IoMdSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setViewType as setViewTypeAction } from '../../store/viewTypeSlice';
import { goToToday, nextPeriod, prevPeriod } from '../../utils/paginateUtils';
import Button from '../buttons/Button';
import SearchInput from '../inputs/SearchInput';
import CalendarHeading from './headings/CalendarHeading';

interface CalendarHeaderProps {
	today: Date;
	viewType: 'month' | 'week';
	setViewType: React.Dispatch<React.SetStateAction<'month' | 'week'>>;
	currentMonth: number;
	currentYear: number;
	setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
	setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
	setSelectedWeek: React.Dispatch<React.SetStateAction<number>>;
	selectedWeek: number;
	firstDayOfMonth: number;
	daysInMonth: (year: number, month: number) => number;
	days: any[];
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
	today,
	currentMonth,
	currentYear,
	setCurrentMonth,
	setCurrentYear,
	setSelectedWeek,
	selectedWeek,
	firstDayOfMonth,
	daysInMonth,
	days,
}) => {
	const viewType = useSelector((state: RootState) => state.viewType.viewType);
	const dispatch = useDispatch<AppDispatch>();

	const handleViewTypeChange = (type: 'month' | 'week') => {
		dispatch(setViewTypeAction(type));
	};

	return (
		<header className="flex justify-between items-center py-[25px] calendar-header">
			<div className="flex items-center gap-[5px] buttons-holder">
				<Button
					type="button"
					value="Today"
					onClick={() =>
						goToToday(today, setCurrentMonth, setCurrentYear, setSelectedWeek)
					}
				/>
				<Button
					type="button"
					value={<IoIosArrowUp />}
					onClick={() =>
						prevPeriod(
							viewType,
							currentMonth,
							currentYear,
							selectedWeek,
							setCurrentMonth,
							setCurrentYear,
							setSelectedWeek,
							firstDayOfMonth,
							daysInMonth,
						)
					}
				/>
				<Button
					type="button"
					value={<IoIosArrowDown />}
					onClick={() =>
						nextPeriod(
							viewType,
							currentMonth,
							currentYear,
							selectedWeek,
							setCurrentMonth,
							setCurrentYear,
							setSelectedWeek,
							firstDayOfMonth,
							daysInMonth,
						)
					}
				/>
			</div>
			<CalendarHeading
				currentYear={currentYear}
				currentMonth={currentMonth}
				days={days}
				viewType={viewType}
			/>
			<div className="flex items-stretch gap-[5px]">
				<SearchInput
					inputPaceholder="Search"
					inputButtonValue={<IoMdSearch />}
				/>
				<Button
					type="button"
					value="Month"
					onClick={() => handleViewTypeChange('month')}
					className={`${viewType === 'month' ? 'active' : ''}`}
				/>
				<Button
					type="button"
					value="Week"
					variant="primary"
					onClick={() => handleViewTypeChange('week')}
					className={`${viewType === 'week' ? 'active' : ''}`}
				/>
			</div>
		</header>
	);
};

export default CalendarHeader;
