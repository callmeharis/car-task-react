import { useEffect } from "react";
import Car from "./Car";
import Wrapper from "../assets/wrappers/CarsContainer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { getAllCars } from "../features/allCars/allCarsSlice";
import PageBtnContainer from "./PageBtnContainer";
const CarsContainer = () => {
  const { cars, isLoading, page, totalCars, numOfPages, search, sort } =
    useSelector((store) => store.allCars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [page, search, sort, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (cars.length === 0) {
    return (
      <Wrapper>
        <h2>No Cars to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalCars} car{cars.length > 1 && "s"} found
      </h5>
      <div className="cars">
        {cars.map((car) => {
          return <Car key={car._id} {...car} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default CarsContainer;
