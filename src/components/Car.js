import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Car";
import { useDispatch } from "react-redux";
import CarInfo from "./CarInfo";
import moment from "moment";
import { deleteCar, setEditCar } from "../features/car/carSlice";
const Car = ({ _id, carModel, price, phone, carImage, createdAt }) => {
  const dispatch = useDispatch();

  const date = moment(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{carModel.charAt(0)}</div>
        <div className="info">
          <h5>{carModel}</h5>
          <h5>${price}</h5>
          <p>{phone}</p>
        </div>
      </header>
      <div className="all-cars-parent">
        {carImage.map((car) => {
          return <img src={car} alt="cars" />;
        })}
      </div>
      <div className="content">
        <div className="content-center">
          <CarInfo icon={<FaCalendarAlt />} text={date} />
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-car"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditCar({
                    editCarId: _id,
                    carModel,
                    price,
                    phone,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteCar(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Car;
