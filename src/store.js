import { configureStore } from "@reduxjs/toolkit";
import carSlice from "./features/car/carSlice";
import userSlice from "./features/user/userSlice";
import allCarsSlice from "./features/allCars/allCarsSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    car: carSlice,
    allCars: allCarsSlice,
  },
});
