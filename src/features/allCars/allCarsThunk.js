import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllCarsThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allCars;

  let url = `/cars?status=${searchStatus}&carModel=${searchType}&sort=${sort}&page=${page}`;
  // let url = `/cars?sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
