import { useContext } from "react";
import ParteDiariaContext from "../context/ParteDiariaContext";

const useParteDiariaData = () => useContext(ParteDiariaContext)

export default useParteDiariaData