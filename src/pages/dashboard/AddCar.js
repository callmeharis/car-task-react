import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  handleChange,
  clearValues,
  createCar,
  editCar,
} from "../../features/car/carSlice";
import { useState } from "react";
const AddCar = () => {
  const { isLoading, carModel, price, phone, isEditing, editCarId } =
    useSelector((store) => store.car);
  const dispatch = useDispatch();

  const [carImage, setCarImage] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!carModel || !price || !phone || !carImage.length === 0) {
      toast.error("Please fill out all fields");
      return;
    }
    const formData = new FormData();
    formData.append("carModel", carModel);
    formData.append("price", price);
    formData.append("phone", phone);
    carImage.forEach((image) => formData.append("carImage", image));
    if (isEditing) {
      dispatch(
        editCar({
          carId: editCarId,
          car: { formData },
        })
      );
      return;
    }
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? value.name : value);
    }
    dispatch(createCar(formData));
  };

  const handleCarInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handleImageChange = (e) => {
    setCarImage([...e.target.files]);
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit car" : "add car"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="carModel"
            labelText="Car model"
            value={carModel}
            handleChange={handleCarInput}
          />
          <FormRow
            type="number"
            name="price"
            value={price}
            handleChange={handleCarInput}
          />
          <FormRow
            type="text"
            name="phone"
            labelText="Phone no."
            value={phone}
            handleChange={handleCarInput}
          />
          <div className="form-row" style={{ margin: "10px 0" }}>
            <input
              type="file"
              name="carImage"
              onChange={handleImageChange}
              multiple
            />
          </div>
        </div>
        {carImage.length > 0 && (
          <div className="preview-images-parent">
            {carImage.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
              />
            ))}
          </div>
        )}
        <div className="btn-container">
          <button
            type="button"
            className="btn btn-block clear-btn"
            onClick={() => {
              setCarImage(null);
              dispatch(clearValues());
            }}
          >
            clear
          </button>
          <button
            type="submit"
            className="btn btn-block submit-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            submit
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddCar;
