'use client';

// Importing necessary hooks and libraries
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Importing the root state type from Redux store
import { EventContextProps } from '../types/types'; // Importing the Event type for type safety

// Defining the props for the EventProvider component
interface EventProviderProps {
	children: ReactNode; // The children components to be wrapped by the provider
}

// Creating the EventContext with undefined as the initial value
const EventContext = createContext<EventContextProps | undefined>(undefined);

// EventProvider component to provide the context data to children components
export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
	// Accessing the events from Redux store
	const events = useSelector((state: RootState) => state.event.events) || [];

	// Defining the local state for the search query
	const [searchQuery, setSearchQuery] = useState<string>('');

	// Memoizing the filtered events based on the search query to avoid unnecessary recalculations
	const filteredEvents = useMemo(() => {
		return events.filter(
			(event) => event.title.toLowerCase().includes(searchQuery.toLowerCase()), // Filter events by matching title with search query
		);
	}, [events, searchQuery]); // Only recalculate when events or searchQuery change

	// Returning the EventContext.Provider with the context value
	return (
		<EventContext.Provider
			value={{ searchQuery, setSearchQuery, filteredEvents }}
		>
			{children} {/* Wrapping the children components */}
		</EventContext.Provider>
	);
};

// Custom hook to use the EventContext
export const useEventContext = () => {
	// Accessing the context value
	const context = useContext(EventContext);

	// Throwing an error if the hook is used outside the EventProvider
	if (!context) {
		throw new Error('useEventContext must be used within an EventProvider');
	}

	// Returning the context value
	return context;
};
