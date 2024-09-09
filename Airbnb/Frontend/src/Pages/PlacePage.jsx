import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceAddress from "../Components/Re-usable/PlaceAddress";
import BookingWidget from "../Components/PlacePage/BookingWidget";
import PlaceGallery from "../Components/Re-usable/PlaceGallery";
import ExtraInfo from "../Components/PlacePage/ExtraInfo";
import PlaceDescription from "../Components/PlacePage/PlaceDescription";
import ShowMorePhotos from "../Components/Re-usable/ShowMorePhotos";
import LogInModal from "../Components/PlacePage/LogInModal";

const PlacePage = () => {
  const [place, setPlace] = useState(null);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await fetch(`http://localhost:3001/places/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.place);
        setPlace(data.place);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPlace();
  }, []);

  return showPhotos ? (
    <ShowMorePhotos place={place} setShowPhotos={setShowPhotos} />
  ) : (
    <div className="flex flex-col gap-2 dark:text-white">
      <PlaceAddress place={place} />
      <PlaceGallery place={place} setShowPhotos={setShowPhotos} />

      <div className="grid grid-cols-[3fr_2fr] my-5 gap-5">
        <PlaceDescription place={place} />
        <BookingWidget place={place} setShowModal={setShowModal} />
      </div>

      {place?.extraInfo ? <ExtraInfo place={place} /> : <></>}

      {showModal && <LogInModal setShowModal={setShowModal} />}
    </div>
  );
};

export default PlacePage;
