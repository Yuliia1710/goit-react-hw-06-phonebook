import { configureStore } from '@reduxjs/toolkit';

import { persistStore } from 'redux-persist';
import { filterReduser } from './filterSlice';

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { persistedContactsReducer } from './contactSlice';

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filter: filterReduser,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
