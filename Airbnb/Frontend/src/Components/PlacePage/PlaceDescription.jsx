const PlaceDescription = ({ place }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <span className="text-xl font-semibold">Description</span>
        <p className="text-sm text-gray-500">{place?.description}</p>
      </div>
      <div className="flex flex-col gap-0.5 text-sm">
        <p>
          <span>Check-in:</span>
          <span className="text-gray-500"> {place?.checkIn}</span>
        </p>
        <p>
          <span>Check-out:</span>{" "}
          <span className="text-gray-500">{place?.checkOut}</span>
        </p>
        <p>
          <span>Maximum number of guests:</span>{" "}
          <span className="text-gray-500">{place?.maxGuests}</span>
        </p>
      </div>
    </div>
  );
};

export default PlaceDescription;
