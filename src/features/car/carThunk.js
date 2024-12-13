import { showLoading, hideLoading, getAllCars } from "../allCars/allCarsSlice";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearValues } from "./carSlice";

export const createCarThunk = async (car, thunkAPI) => {
  try {
    const resp = await customFetch.post("/cars", car, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deleteCarThunk = async (carId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/cars/${carId}`);
    thunkAPI.dispatch(getAllCars());
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editCarThunk = async ({ carId, car }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/cars/${carId}`, car);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
