import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaceAddress from "../Components/Re-usable/PlaceAddress";
import PlaceGallery from "../Components/Re-usable/PlaceGallery";
import ShowMorePhotos from "../Components/Re-usable/ShowMorePhotos";
import BookingDetails from "../Components/BookingPage/BookingDetails";

const BookingPage = () => {
  const [booking, setBooking] = useState(null);
  const [showPhotos, setShowPhotos] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch("http://localhost:3001/bookings/" + id, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBooking(data.booking);
        console.log(data.booking);
      } catch (error) {
        console.error("error is", error);
      }
    };
    fetchBooking();
  }, []);

  return showPhotos ? (
    <ShowMorePhotos place={booking?.place} setShowPhotos={setShowPhotos} />
  ) : (
    <div className="flex flex-col gap-5">
      <PlaceAddress place={booking?.place} />

      <BookingDetails booking={booking} />

      <PlaceGallery place={booking?.place} setShowPhotos={setShowPhotos} />
    </div>
  );
};

export default BookingPage;
