import { useEffect, useRef, useState } from "react";
import { FaCar } from "react-icons/fa";
import { FaRadio } from "react-icons/fa6";
import { GiGate } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";

const NewPlacePage = () => {
  const titleRef = useRef();
  const addressRef = useRef();
  const photoRef = useRef();
  const descriptionRef = useRef();
  const extraInfoRef = useRef();
  const checkInRef = useRef();
  const checkOutRef = useRef();
  const maxGuestsRef = useRef();
  const priceRef = useRef();

  const [perks, setPerks] = useState([]);
  const [placePhotos, setPlacePhotos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchMyExistingPlace = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/places/user-place/" + id,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        titleRef.current.value = data.place.title;
        addressRef.current.value = data.place.address;
        descriptionRef.current.value = data.place.description;
        extraInfoRef.current.value = data.place.extraInfo;
        checkInRef.current.value = data.place.checkIn;
        checkOutRef.current.value = data.place.checkOut;
        maxGuestsRef.current.value = data.place.maxGuests;
        priceRef.current.value = data.place.price;

        setPerks(data.place.perks);
        setPlacePhotos(data.place.photos);
      } catch (error) {
        console.error("error is ", error);
      }
    };
    if (id != "newplace") {
      fetchMyExistingPlace();
    }
  }, []);

  const checkBoxClasses = () => {
    return "flex items-center gap-2 p-2 border border-gray-200 rounded-2xl cursor-pointer";
  };

  const labelClasses = () => {
    return "flex flex-col gap-1";
  };

  const inputClasses = () => {
    return "w-full rounded-full border border-gray-200 px-3 py-1.5";
  };

  const textAreaClasses = () => {
    return "w-full rounded-2xl border border-gray-200 px-3 py-1.5";
  };

  const UpdatePerks = (perk) => {
    if (perks.includes(perk)) {
      setPerks(
        perks.filter((item) => {
          return item !== perk;
        })
      );
    } else {
      setPerks([...perks, perk]);
    }
  };

  const addPhotoByLink = (photo) => {
    setPlacePhotos([...placePhotos, photo]);
    photoRef.current.value = "";
  };

  const addPhotoFromDevice = async (e) => {
    const files = e.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    try {
      const response = await fetch("http://localhost:3001/uploadPhotos", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPlacePhotos([...placePhotos, ...data.urls]);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const priorityPhoto = (photo) => {
    const photosWithoutPhoto = placePhotos.filter((item) => item !== photo);
    setPlacePhotos([photo, ...photosWithoutPhoto]);
  };

  const deletePhoto = (photo) => {
    setPlacePhotos(placePhotos.filter((item) => item !== photo));
  };

  const submit = async (e) => {
    e.preventDefault();
    const FormData = {
      title: titleRef.current.value,
      address: addressRef.current.value,
      photos: placePhotos,
      description: descriptionRef.current.value,
      perks,
      extraInfo: extraInfoRef.current.value,
      checkIn: checkInRef.current.value,
      checkOut: checkOutRef.current.value,
      maxGuests: maxGuestsRef.current.value,
      price: priceRef.current.value,
    };
    if (id != "newplace") {
      try {
        const response = await fetch("http://localhost:3001/places/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),
          credentials: "include",
        });
        if (response.status != 201) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("error is", error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:3001/places/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),
          credentials: "include",
        });
        if (response.status != 201) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("error is", error);
      }
    }
  };

  return (
    <form
      onSubmit={submit}
      className="font-semibold flex flex-col gap-3.5 mb-3.5"
    >
      <label className={labelClasses()}>
        <h1 className="text-xl">Title</h1>
        <p className="text-sm text-gray-500">
          Title for your place. should be short and catchy as in advertisement
        </p>
        <input ref={titleRef} type="text" className={inputClasses()} />
      </label>

      <label className={labelClasses()}>
        <h1 className="text-xl">Address</h1>
        <p className="text-sm text-gray-500">Address to this place</p>
        <input ref={addressRef} type="text" className={inputClasses()} />
      </label>

      <label className={labelClasses()}>
        <h1 className="text-xl">Photos</h1>
        <p className="text-sm text-gray-500">more = better</p>
        <div className="flex items-center gap-1.5">
          <input
            ref={photoRef}
            type="text"
            placeholder="Add using a link ....jpg"
            className="flex-grow rounded-full border border-gray-200 px-3 py-1.5 
            placeholder:text-sm placeholder:font-semibold"
          />
          <button
            type="button"
            onClick={() => {
              addPhotoByLink(photoRef.current.value);
            }}
            className="bg-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold 
          border border-gray-300"
          >
            Add photo
          </button>
        </div>
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
      </label>

      <label className={labelClasses()}>
        <h1 className="text-xl">Description</h1>
        <p className="text-sm text-gray-500">description of the place</p>
        <textarea ref={descriptionRef} rows="5" className={textAreaClasses()} />
      </label>

      <div className={labelClasses()}>
        <h1 className="text-xl">Perks</h1>
        <p className="text-sm text-gray-500">
          select all the perks of your place
        </p>
        <div className="my-1 grid grid-cols-6 gap-2">
          <label className={checkBoxClasses()}>
            <input
              type="checkbox"
              checked={perks.includes("Wifi")}
              onChange={() => {
                UpdatePerks("Wifi");
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
              />
            </svg>
            Wifi
          </label>
          <label className={checkBoxClasses()}>
            <input
              type="checkbox"
              checked={perks.includes("Free parking spot")}
              onChange={() => {
                UpdatePerks("Free parking spot");
              }}
            />
            <FaCar className="scale-150" />
            Free parking spot
          </label>
          <label className={checkBoxClasses()}>
            <input
              type="checkbox"
              checked={perks.includes("TV")}
              onChange={() => {
                UpdatePerks("TV");
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            TV
          </label>
          <label className={checkBoxClasses()}>
            <input
              type="checkbox"
              checked={perks.includes("Radio")}
              onChange={() => {
                UpdatePerks("Radio");
              }}
            />
            <FaRadio />
            Radio
          </label>
          <label className={checkBoxClasses()}>
            <input
              type="checkbox"
              checked={perks.includes("Pets")}
              onChange={() => {
                UpdatePerks("Pets");
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>
            Pets
          </label>
          <label className={checkBoxClasses()}>
            <input
              type="checkbox"
              checked={perks.includes("Private entrance")}
              onChange={() => {
                UpdatePerks("Private entrance");
              }}
            />
            <GiGate className="scale-150" />
            Private entrance
          </label>
        </div>
      </div>

      <label className={labelClasses()}>
        <h1 className="text-xl">Extra Info</h1>
        <p className="text-sm text-gray-500">house rules, etc</p>
        <textarea ref={extraInfoRef} rows="5" className={textAreaClasses()} />
      </label>

      <div className={labelClasses()}>
        <h1 className="text-xl">Check in & out times</h1>
        <p className="text-sm text-gray-500">
          add check in & out times, remember to have some time window for
          cleaning the room between guests
        </p>
        <div className="my-1 grid grid-cols-4 gap-2">
          <label className={labelClasses()}>
            Check in time
            <input ref={checkInRef} type="number" className={inputClasses()} />
          </label>
          <label className={labelClasses()}>
            Check out time
            <input ref={checkOutRef} type="number" className={inputClasses()} />
          </label>
          <label className={labelClasses()}>
            Max number of guests
            <input
              ref={maxGuestsRef}
              type="number"
              className={inputClasses()}
            />
          </label>
          <label className={labelClasses()}>
            Price per night
            <input ref={priceRef} type="number" className={inputClasses()} />
          </label>
        </div>
      </div>

      <button className="w-full px-5 py-1.5 rounded-full bg-primary text-white">
        Save
      </button>
    </form>
  );
};

export default NewPlacePage;
