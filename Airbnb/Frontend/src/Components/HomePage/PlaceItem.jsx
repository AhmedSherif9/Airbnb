import { Link } from "react-router-dom";
import { useSearch } from "../../Context/SearchContext";

const PlaceItem = ({ place }) => {
  const { close } = useSearch();

  return (
    <article className="flex flex-col gap-1">
      <Link
        onClick={close}
        to={`/places/${place._id}`}
        className="rounded-2xl overflow-hidden cursor-pointer"
      >
        <img
          src={place.photos[0]}
          alt="photo"
          className="object-cover w-64 h-64"
        />
      </Link>
      <p className="font-semibold text-base truncate dark:text-white">
        {place.title}
        {", "}
        {place.address}
      </p>
      <p className="text-gray-500 text-sm truncate">{place.description}</p>
      <p className="dark:text-white">
        <span className="font-semibold text-base">${place.price}</span> per
        night
      </p>
    </article>
  );
};

export default PlaceItem;
