import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateBalance } from "../../services/staffMgmtServices";

const initialState = {
  balances: {},
};

export const balanceReducer = createSlice({
  name: "balance",
  initialState,
  reducers: {
    // setBalance: (state, action) => {
    //   const { staffId, balance } = action.payload;
    //   state.balances = {
    //     ...state.balances,
    //     [staffId]: balance,
    //   };
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(setBalance.fulfilled, (state, action) => {
      const { staffId, balance } = action.payload;
      if (staffId && (balance || balance === 0)) {
        state.balances = {
          ...state.balances,
          [staffId]: balance,
        };
      } else {
        console.error("Invalid payload structure:", action.payload);
      }
    });
  },
});

export const setBalance = createAsyncThunk(
  "balances/updateBalance",
  async ({ staffId, balance }) => {
    try {
      if (staffId && (balance || balance === 0)) {
        const res = await UpdateBalance(staffId, { balance });
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const selectBalanceState = (state) => state.balance.balances;

//export const { setBalance } = balanceReducer.actions;

export default balanceReducer.reducer;
