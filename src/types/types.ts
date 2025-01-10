// Represents a holiday with a date and its local name.
export interface Holiday {
	date: string; // The date of the holiday in string format (e.g., '2024-12-25')
	localName: string; // The local name of the holiday (e.g., 'Christmas')
}

// Represents a country with its country code and name.
export interface Country {
	countryCode: string; // The country code (e.g., 'US', 'GB')
	name: string; // The name of the country (e.g., 'United States', 'United Kingdom')
}

// Represents an event with details like date, title, and start/end times.
export interface Event {
	id: number; // Unique identifier for the event
	date: string; // Date of the event (e.g., '2024-12-25')
	title: string; // Title of the event (e.g., 'Christmas Party')
	startTime: string; // Start time of the event in HH:mm format (e.g., '18:00')
	endTime: string; // End time of the event in HH:mm format (e.g., '21:00')
}

// Represents the state of events, containing an array of event objects.
export interface EventState {
	events: Event[]; // Array of events for the application
}

// Represents a single day with the year, month, day, and whether it is in the current month.
export interface Day {
	year: number; // The year of the day (e.g., 2024)
	month: number; // The month of the day (e.g., 0 = January, 11 = December)
	day: number; // The day of the month (e.g., 25 for Christmas)
	isCurrentMonth: boolean; // Flag indicating if the day is in the current month
}

// Represents an option with a value and label, typically used in dropdowns or selections.
export interface Option {
	value: string | number; // The value of the option, can be a string or number
	label: string; // The display label for the option (e.g., 'January', 'Option 1')
}

// Represents the state for the view type, either 'month' or 'week'.
export interface ViewTypeState {
	viewType: 'month' | 'week'; // The current view type ('month' or 'week')
}

// Represents the state for the selected week, the current month, and the current year.
export interface WeekState {
	selectedWeek: number; // The index of the selected week (0-based)
	currentMonth: number; // The current month (0-based index: 0 = January, 11 = December)
	currentYear: number; // The current year (e.g., 2024)
}

// Defining the shape of the context data
export interface EventContextProps {
	searchQuery: string; // The current search query
	setSearchQuery: (query: string) => void; // Function to update the search query
	filteredEvents: Event[]; // List of events filtered based on the search query
}
