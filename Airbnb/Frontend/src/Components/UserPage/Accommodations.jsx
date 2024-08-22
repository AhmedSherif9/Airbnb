import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Accommodations = () => {
  const [myPlaces, setMyPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPlaces = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/places/user-places",
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMyPlaces(data.places);
      } catch (error) {
        console.error("error is ", error);
      }
    };
    fetchMyPlaces();
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Link
        to={"/userpage/accommodations/newplace"}
        className="bg-primary text-white px-5 py-2
       rounded-full flex items-center gap-1 font-semibold text-sm"
      >
        <IoMdAdd className="text-white scale-125" />
        Add new place
      </Link>
      <div className="w-full flex flex-col gap-2">
        {myPlaces.map((place, index) => {
          return (
            <article
              onClick={() => {
                navigate("/userpage/accommodations/" + place._id);
              }}
              key={index}
              className="w-full bg-gray-200 rounded-2xl flex items-center gap-3.5 
              p-3.5 cursor-pointer"
            >
              <div className="w-1/6">
                <img
                  src={place.photos[0]}
                  alt="photo"
                  className="object-cover h-36 w-full"
                />
              </div>

              <div className="flex flex-col gap-1 w-5/6">
                <span className="font-semibold text-lg text-black">
                  {place.title}
                </span>

                <p className="font-semibold text-sm text-gray-800">
                  {place.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Accommodations;
