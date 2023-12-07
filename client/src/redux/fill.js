import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "fillForm",
  initialState: {
    answers: [],
  },
  reducers: {
    updateAnswers: (state, action) => {
      state.answers = action.payload;
    },
  },
});

export const { updateAnswers } = formSlice.actions;
export default formSlice.reducer;
