import { CiLocationOn } from "react-icons/ci";

const PlaceAddress = ({ place }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-3xl font-semibold">{place?.title}</div>
      <div className="flex items-center gap-1 cursor-pointer">
        <CiLocationOn className="scale-125 text-black" />
        <span className="text-sm font-semibold underline">
          {place?.address}
        </span>
      </div>
    </div>
  );
};

export default PlaceAddress;
