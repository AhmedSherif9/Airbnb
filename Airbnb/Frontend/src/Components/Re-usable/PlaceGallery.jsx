import { IoImageSharp } from "react-icons/io5";
const PlaceGallery = ({ place, setShowPhotos }) => {
  return (
    <article className="grid grid-cols-[2fr_1fr] gap-2 rounded-2xl overflow-hidden relative">
      <div>
        <img
          src={place?.photos?.[0]}
          alt="photo"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="grid grid-rows-2 gap-2">
        <div>
          <img
            src={place?.photos?.[1]}
            alt="photo"
            className="object-cover h-full"
          />
        </div>
        <div>
          <img
            src={place?.photos?.[2]}
            alt="photo"
            className="object-cover h-full"
          />
        </div>
      </div>

      <button
        onClick={() => {
          setShowPhotos(true);
        }}
        className="absolute bottom-0 right-0 bg-white rounded-xl px-3.5 py-1.5 m-2 
        flex items-center gap-1 shadow-lg shadow-gray-700"
      >
        <IoImageSharp className="scale-110" />
        <span className="font-semibold text-sm">Show more photos</span>
      </button>
    </article>
  );
};

export default PlaceGallery;
