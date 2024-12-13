import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllCarsThunk } from "./allCarsThunk";

const initialFiltersState = {
  search: "",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: true,
  cars: [],
  totalCars: 0,
  numOfPages: 1,
  page: 1,
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllCars = createAsyncThunk("allCars/getCars", getAllCarsThunk);

const allCarsSlice = createSlice({
  name: "allCars",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllCarsState: (state) => initialState,
  },
  extraReducers: {
    [getAllCars.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllCars.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.cars = payload.cars;
      state.numOfPages = payload.numOfPages;
      state.totalCars = payload.totalCars;
    },
    [getAllCars.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllCarsState,
} = allCarsSlice.actions;

export default allCarsSlice.reducer;
