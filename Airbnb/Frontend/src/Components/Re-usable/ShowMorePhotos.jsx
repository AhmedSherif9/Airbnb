import { IoIosClose } from "react-icons/io";

const ShowMorePhotos = ({ place, setShowPhotos }) => {
  return (
    <div
      className="absolute inset-0 bg-black text-white font-semibold text-3xl
 py-8 overflow-y-auto"
    >
      <div className="flex flex-col gap-3 w-6/12 mx-auto">
        <p>Photos of {place?.title}</p>

        {place?.photos?.map((photo, index) => {
          return (
            <article key={index} className="rounded-lg overflow-hidden">
              <img
                src={photo}
                alt="photo"
                className="object-cover w-full h-full"
              />
            </article>
          );
        })}
      </div>

      <button
        onClick={() => {
          setShowPhotos(false);
        }}
        className="fixed top-0 right-0 bg-white text-black rounded-xl pl-1.5 pr-3 py-0.5 
    mt-7 mr-14 flex items-center gap-0.5 shadow-lg shadow-gray-700"
      >
        <IoIosClose />
        <span className="font-semibold text-sm">Close photos</span>
      </button>
    </div>
  );
};

export default ShowMorePhotos;
