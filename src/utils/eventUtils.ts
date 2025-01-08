interface Event {
	date: string;
	title: string;
	startTime: string;
	endTime: string;
}

export const addEvent = (
	events: Event[],
	date: string,
	title: string,
	startTime: string,
	endTime: string,
): Event[] => {
	const newEvent = { date, title, startTime, endTime };
	return [...events, newEvent];
};

export const updateEvent = (
	events: Event[],
	oldEvent: Event,
	title: string,
	startTime: string,
	endTime: string,
): Event[] => {
	return events.map((event) =>
		event === oldEvent ? { ...event, title, startTime, endTime } : event,
	);
};
