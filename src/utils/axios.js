import axios from "axios";
import { clearStore } from "../features/user/userSlice";
import { getUserFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  // baseURL: 'http://localhost:5000/api/v1',
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
