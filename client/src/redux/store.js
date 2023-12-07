import { configureStore } from "@reduxjs/toolkit";
import createReducer from "./create";
import fillReducer from "./fill";
export default configureStore({
  reducer: {
    createForm: createReducer,
    fillForm: fillReducer,
  },
});
