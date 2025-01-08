import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default: localStorage for web
import eventReducer from './eventSlice';
import viewTypeReducer from './viewTypeSlice';
import weekReducer from './weekSlice';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['week', 'viewType', 'event'],
};

const rootReducer = combineReducers({
	week: weekReducer,
	viewType: viewTypeReducer,
	event: eventReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Отключаем предупреждения о сериализации
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
