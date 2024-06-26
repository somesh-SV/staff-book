import { configureStore } from "@reduxjs/toolkit";
import dialogReducer from "../Reducer/dialog.reducer";
import balanceReducer from "../Reducer/balance.reducer";

export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    balance: balanceReducer,
  },
});
