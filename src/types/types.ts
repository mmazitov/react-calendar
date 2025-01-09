export interface Holiday {
	date: string;
	localName: string;
}

export interface Event {
	id: number;
	date: string;
	title: string;
	startTime: string;
	endTime: string;
}

export interface EventState {
	events: Event[];
}

export interface Day {
	year: number;
	month: number;
	day: number;
	isCurrentMonth: boolean;
}

export interface Option {
	value: string | number;
	label: string;
}

export interface ViewTypeState {
	viewType: 'month' | 'week';
}

export interface WeekState {
	selectedWeek: number;
	currentMonth: number;
	currentYear: number;
}
