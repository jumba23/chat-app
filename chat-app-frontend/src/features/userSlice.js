import { createSlice } from "@reduxjs/toolkit";
import { current } from '@reduxjs/toolkit'
import appApi from "../services/appApi";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addNotifications: (state, { payload }) => {
      console.log(current(state))
      if (state[payload] ) {
        state[payload] = state[payload] + 1;
        
      } else {
        state[payload] = 1;
        
      }
      console.log(current(state))
    },
    resetNotifications: (state, { payload }) => {
      delete state[payload];
    },
  },

  extraReducers: (builder) => {
    // save user after signup
    builder.addMatcher(
      appApi.endpoints.signupUser.matchFulfilled,
      (state, { payload }) => payload
    );
    // save user after login
    builder.addMatcher(
      appApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => payload
    );
    // logout: destroy user session
    builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);
  },
});

export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;
