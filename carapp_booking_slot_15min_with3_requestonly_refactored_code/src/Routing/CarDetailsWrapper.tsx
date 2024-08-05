import React from "react";
import { useParams } from "react-router-dom";
import CarDetails from "../Pages/CarDetails";

const CarDetailsWrapper: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <div>No car ID provided</div>;
  }

  return <CarDetails carId={id} />;
};

export default CarDetailsWrapper;