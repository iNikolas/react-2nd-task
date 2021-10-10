import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./../features/Table/tableSlice";

export const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});
