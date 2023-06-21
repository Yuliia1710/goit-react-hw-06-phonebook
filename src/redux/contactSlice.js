import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const initialState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action) {
      return { contacts: [...state.contacts, action.payload] };
    },

    deleteContact(state, action) {
      // console.log('state', state.contacts);
      return {
        contacts: state.contacts.filter(
          element => element.id !== action.payload
        ),
      };
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);
// Генераторы экшенов
export const { addContact, deleteContact } = contactsSlice.actions;
// Редюсер слайса
// export const contactReducer = contactsSlice.reducer;
