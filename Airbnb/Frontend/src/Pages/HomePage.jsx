import { useState, useEffect } from "react";
import PlaceItem from "../Components/HomePage/PlaceItem";
import { useSearch } from "../Context/SearchContext";
import { Empty } from "antd";

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const { searchTerm } = useSearch();

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

  const fetchSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/places/search?searchTerm=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPlaces([...data.places]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      fetchPlaces();
    } else {
      fetchSearch();
    }
  }, [searchTerm]);

  return (
    <>
      {places?.length > 0 ? (
        <div className="grid grid-cols-3 gap-7">
          {places.map((place, index) => {
            return <PlaceItem key={index} place={place} />;
          })}
        </div>
      ) : (
        <div className="flex justify-center">
          {searchTerm ? (
            <Empty
              image={
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRvDYkbyJJyOOt1oUe5EDKcTjBOYM6hI9Erg&s"
                  alt=""
                  className="object-cover rounded-full"
                />
              }
              description="No place matches your search."
            />
          ) : (
            <Empty
              image={
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4_UlgiHsRy0ZoqJGYs28X5HecAzd7DJF2Ag&s"
                  alt=""
                  className="object-cover rounded-lg"
                />
              }
              description="No places added yet."
            />
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
