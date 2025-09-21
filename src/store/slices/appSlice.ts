import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../../types';

interface AppState {
  darkMode: boolean;
  language: 'en' | 'hi';
  notifications: Notification[];
  isLoading: boolean;
}

const initialState: AppState = {
  darkMode: false,
  language: 'en',
  notifications: [],
  isLoading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setLanguage: (state, action: PayloadAction<'en' | 'hi'>) => {
      state.language = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
    },
    markNotificationRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { 
  toggleDarkMode, 
  setLanguage, 
  addNotification, 
  markNotificationRead, 
  clearNotifications, 
  setLoading 
} = appSlice.actions;
export default appSlice.reducer;