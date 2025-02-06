import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Holds the user data (initially null)
  isAuthenticated: false, // To track if the user is authenticated
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action for successful registration
    login: (state, action) => {
      state.user = action.payload; // Store user data in the state
      state.user.notes = [];
      state.isAuthenticated = true; // Mark the user as authenticated
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    addNotes: (state, action) => {
      state.user.notes = action.payload; // Adds new note to the Redux store
    },
  },
});

export const { login, logout, addNotes } = userSlice.actions;

export default userSlice.reducer;
