import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createCarThunk, deleteCarThunk, editCarThunk } from "./carThunk";
const initialState = {
  isLoading: false,
  carModel: "",
  price: "",
  phone: "",
  isEditing: false,
  editCarId: "",
};

export const createCar = createAsyncThunk("car/createCar", createCarThunk);

export const deleteCar = createAsyncThunk("car/deleteCar", deleteCarThunk);

export const editCar = createAsyncThunk("car/editCar", editCarThunk);

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
      };
    },
    setEditCar: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: {
    [createCar.pending]: (state) => {
      state.isLoading = true;
    },
    [createCar.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Car Created");
    },
    [createCar.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteCar.fulfilled]: (state, { payload }) => {
      toast.success(payload);
    },
    [deleteCar.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [editCar.pending]: (state) => {
      state.isLoading = true;
    },
    [editCar.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Car Modified...");
    },
    [editCar.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleChange, clearValues, setEditCar } = carSlice.actions;

export default carSlice.reducer;
