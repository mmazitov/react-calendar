// Importing necessary functions and modules
import { configureStore } from '@reduxjs/toolkit'; // Function to configure the Redux store
import { combineReducers } from 'redux'; // Function to combine multiple reducers
import { persistReducer, persistStore } from 'redux-persist'; // Functions for persisting state
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage for web)

// Importing individual reducers from their respective slice files
import eventReducer from './eventSlice'; // Reducer for handling events
import viewTypeReducer from './viewTypeSlice'; // Reducer for handling view type (month/week)
import weekReducer from './weekSlice'; // Reducer for handling week and date-related state

// Configuration for redux-persist to store and persist state
const persistConfig = {
	key: 'root', // Key to identify the persisted data in storage
	storage, // Storage method (localStorage for web by default)
	whitelist: ['week', 'viewType', 'event'], // Only persist 'week', 'viewType', and 'event' slices
};

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
	week: weekReducer, // 'week' slice reducer
	viewType: viewTypeReducer, // 'viewType' slice reducer
	event: eventReducer, // 'event' slice reducer
});

// Wrapping the rootReducer with persistReducer to enable state persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuring the Redux store with the persisted reducer
export const store = configureStore({
	reducer: persistedReducer, // Using the persisted reducer
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Disabling serializable state check to avoid warnings
		}),
});

// Creating a persistor to manage the persisted state
export const persistor = persistStore(store);

// Types for state and dispatch used for TypeScript support
export type RootState = ReturnType<typeof rootReducer>; // Root state type
export type AppDispatch = typeof store.dispatch; // App dispatch type
