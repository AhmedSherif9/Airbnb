import { Link } from "react-router-dom";

const PlaceItem = ({ place }) => {
  return (
    <article className="flex flex-col gap-1">
      <Link
        to={`/places/${place._id}`}
        className="rounded-2xl overflow-hidden cursor-pointer"
      >
        <img
          src={place.photos[0]}
          alt="photo"
          className="object-cover w-64 h-64"
        />
      </Link>
      <p className="font-semibold text-base truncate">
        {place.title}
        {", "}
        {place.address}
      </p>
      <p className="text-gray-500 text-sm truncate">{place.description}</p>
      <p>
        <span className="font-semibold text-base">${place.price}</span> per
        night
      </p>
    </article>
  );
};

export default PlaceItem;
