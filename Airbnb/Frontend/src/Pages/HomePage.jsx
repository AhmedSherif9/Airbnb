import { useState, useEffect } from "react";
import PlaceItem from "../Components/HomePage/PlaceItem";

const HomePage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("http://localhost:3001/places");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPlaces([...data.places]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPlaces();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-7">
      {places.map((place, index) => {
        return <PlaceItem key={index} place={place} />;
      })}
    </div>
  );
};

export default HomePage;
