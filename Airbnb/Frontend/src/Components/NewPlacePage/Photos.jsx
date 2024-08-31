import { FaStar } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import { toast } from "react-hot-toast";

const Photos = ({
  placePhotos,
  setPlacePhotos,
  register,
  getValues,
  setValue,
}) => {
  const labelClasses = () => {
    return "flex flex-col gap-1";
  };

  const addPhotoByLink = (photo) => {
    toast.loading("Adding Photo", { id: "link", duration: 9000 });
    setPlacePhotos([...placePhotos, photo]);
    setValue("photoLink", "");
    toast.success("Photo Added Successfully", { id: "link", duration: 3000 });
  };

  const addPhotoFromDevice = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      toast.loading("Uploading Photo", { id: "photo", duration: 9000 });
      const response = await fetch("http://localhost:3001/files/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPlacePhotos([...placePhotos, ...data.filesURLS]);
      toast.success("Photo Uploaded Successfully", {
        id: "photo",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Uploading Photo Failed", {
        id: "photo",
        duration: 3000,
      });
    }
  };

  const priorityPhoto = (photo) => {
    const photosWithoutPhoto = placePhotos.filter((item) => item !== photo);
    setPlacePhotos([photo, ...photosWithoutPhoto]);
  };

  const deletePhoto = async (photo) => {
    if (photo.startsWith("https://firebasestorage.googleapis.com")) {
      try {
        const response = await fetch("http://localhost:3001/files/delete", {
          method: "DELETE",
          body: JSON.stringify({ photo }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.status != 204) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
    setPlacePhotos(placePhotos.filter((item) => item !== photo));
  };

  return (
    <div className={labelClasses()}>
      <label className={labelClasses()}>
        <h1 className="text-xl">Photos</h1>
        <p className="text-sm text-gray-500">more = better</p>
        <div className="flex items-center gap-1.5">
          <input
            {...register("photoLink")}
            type="text"
            placeholder="Add using a link ....jpg"
            className="flex-grow rounded-full border border-gray-200 px-3 py-1.5 
      placeholder:text-sm placeholder:font-semibold"
          />
          <button
            type="button"
            onClick={() => {
              addPhotoByLink(getValues("photoLink"));
            }}
            className="bg-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold 
    border border-gray-300"
          >
            Add photo
          </button>
        </div>
      </label>

      {placePhotos && (
        <div className="grid grid-cols-6 gap-1.5 p-1">
          {/* <article className="h-80 bg-red-400">yes</article> */}
          {placePhotos.map((photo, index) => {
            return (
              <article
                key={index}
                className="h-30 rounded-xl overflow-hidden relative"
              >
                <img
                  src={photo}
                  alt="photo"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    priorityPhoto(photo);
                  }}
                  className="absolute bottom-0 left-0 m-2 text-white
             bg-gray-950 bg-opacity-50 p-2.5 rounded-xl"
                >
                  {index == 0 ? (
                    <FaStar className="scale-110" />
                  ) : (
                    <FaRegStar className="scale-110" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deletePhoto(photo);
                  }}
                  className="absolute bottom-0 right-0 m-2 text-white
             bg-gray-950 bg-opacity-50 p-2.5 rounded-xl"
                >
                  <FaRegTrashAlt className="scale-110" />
                </button>
              </article>
            );
          })}
          {/* <article className="h-80 bg-red-400">yes</article> */}
          <article
            className="h-30 rounded-xl overflow-hidden 
      flex justify-center items-center border border-gray-200"
          >
            <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
              <MdOutlineCloudUpload className="scale-125 text-2xl" />
              <span className="text-xl">Upload</span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={addPhotoFromDevice}
              />
            </label>
          </article>
        </div>
      )}
    </div>
  );
};

export default Photos;
