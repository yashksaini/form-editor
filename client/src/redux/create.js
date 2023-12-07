import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "createForm",
  initialState: {
    banner: "",
    title: "Untitled Form",
    questions: [],
  },
  reducers: {
    changeTheBanner: (state, action) => {
      state.banner = action.payload;
    },
    changeTheTitle: (state, action) => {
      state.title = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    updateQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const { changeTheTitle, changeTheBanner, addQuestion, updateQuestions } =
  formSlice.actions;
export default formSlice.reducer;
