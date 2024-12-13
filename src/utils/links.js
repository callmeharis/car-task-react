import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  { id: 2, text: "all cars", path: "/", icon: <MdQueryStats /> },
  { id: 3, text: "add car", path: "add-car", icon: <FaWpforms /> },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
];

export default links;
