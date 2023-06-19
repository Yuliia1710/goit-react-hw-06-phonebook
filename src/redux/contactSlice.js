import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action) {
      state.push(action.payload);
    },

    deleteContact(state, action) {
      return state.filter(element => element.id !== action.payload);
    },
  },
});

// Генераторы экшенов
export const { addContact, deleteContact } = contactsSlice.actions;
// Редюсер слайса
export const contactReducer = contactsSlice.reducer;
