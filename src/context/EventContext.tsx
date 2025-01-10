import React, { createContext, useContext, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Event } from '../types/types';

interface EventContextProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	filteredEvents: Event[];
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const EventProvider: React.FC = ({ children }) => {
	const events = useSelector((state: RootState) => state.event.events) || [];
	const [searchQuery, setSearchQuery] = useState<string>('');

	const filteredEvents = useMemo(() => {
		return events.filter((event) =>
			event.title.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [events, searchQuery]);

	return (
		<EventContext.Provider
			value={{ searchQuery, setSearchQuery, filteredEvents }}
		>
			{children}
		</EventContext.Provider>
	);
};

export const useEventContext = () => {
	const context = useContext(EventContext);
	if (!context) {
		throw new Error('useEventContext must be used within an EventProvider');
	}
	return context;
};
