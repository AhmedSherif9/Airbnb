import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Input from "../Components/NewPlacePage/Input";
import Photos from "../Components/NewPlacePage/Photos";
import Perks from "../Components/NewPlacePage/Perks";

const NewPlacePage = () => {
  const { register, handleSubmit, formState, getValues, setValue } = useForm();
  const { errors } = formState;

  const [perks, setPerks] = useState([]);
  const [placePhotos, setPlacePhotos] = useState([]);

  const { id } = useParams();

  const fetchMyExistingPlace = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/places/user-places/" + id,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setValue("title", data.place.title);
      setValue("address", data.place.address);
      setValue("description", data.place.description);
      setValue("extraInfo", data.place.extraInfo);
      setValue("checkIn", data.place.checkIn);
      setValue("checkOut", data.place.checkOut);
      setValue("maxGuests", data.place.maxGuests);
      setValue("price", data.place.price);

      setPerks(data.place.perks);
      setPlacePhotos(data.place.photos);
    } catch (error) {
      console.error("error is ", error);
    }
  };

  useEffect(() => {
    if (id != "newplace") {
      fetchMyExistingPlace();
    }
  }, []);

  const submitData = async (toastID, data, httpMethod) => {
    try {
      toast.loading(
        `${httpMethod == "PUT" ? "editing" : "adding"} ${getValues("title")}`,
        {
          id: toastID,
          duration: 9000,
        }
      );
      const response = await fetch("http://localhost:3001/places/" + id, {
        method: httpMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (response.status != 201) {
        throw new Error("Network response was not ok");
      }
      toast.success(
        `${getValues("title")} ${
          httpMethod == "PUT" ? "edited" : "added"
        } Successfully`,
        {
          id: toastID,
          duration: 3000,
        }
      );
    } catch (error) {
      console.error("error is", error);
      toast.error(
        `${httpMethod == "PUT" ? "editing" : "adding"} ${getValues(
          "title"
        )} Failed`,
        {
          id: toastID,
          duration: 3000,
        }
      );
    }
  };

  const submit = async (data) => {
    data.photos = placePhotos;
    data.perks = perks;
    if (id != "newplace") {
      await submitData("edit", data, "PUT");
    } else {
      await submitData("add", data, "POST");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="font-semibold flex flex-col gap-3.5 mb-3.5"
    >
      <Input
        header={"Title"}
        Subheading={
          "Title for your place. should be short and catchy as in advertisement"
        }
        registerName={"title"}
        register={register}
        errors={errors}
        inputFlag={true}
        inputType={"text"}
        required={true}
        headersExist={true}
      />

      <Input
        header={"Address"}
        Subheading={"Address to this place"}
        registerName={"address"}
        register={register}
        errors={errors}
        inputFlag={true}
        inputType={"text"}
        required={true}
        headersExist={true}
      />

      <Photos
        placePhotos={placePhotos}
        setPlacePhotos={setPlacePhotos}
        register={register}
        getValues={getValues}
        setValue={setValue}
      />

      <Input
        header={"Description"}
        Subheading={"description of the place"}
        registerName={"description"}
        register={register}
        errors={errors}
        inputFlag={false}
        inputType={""}
        required={true}
        headersExist={true}
      />

      <Perks perks={perks} setPerks={setPerks} />

      <Input
        header={"Extra Info"}
        Subheading={"house rules, etc"}
        registerName={"extraInfo"}
        register={register}
        errors={errors}
        inputFlag={false}
        inputType={""}
        required={false}
        headersExist={true}
      />

      <div className="flex flex-col gap-1">
        <h1 className="text-xl">Check in & out times</h1>
        <p className="text-sm text-gray-500">
          add check in & out times, remember to have some time window for
          cleaning the room between guests
        </p>
        <div className="my-1 grid grid-cols-4 gap-2">
          <Input
            header={"Check in time"}
            Subheading={""}
            registerName={"checkIn"}
            register={register}
            errors={errors}
            inputFlag={true}
            inputType={"number"}
            required={true}
            headersExist={false}
          />
          <Input
            header={"Check out time"}
            Subheading={""}
            registerName={"checkOut"}
            register={register}
            errors={errors}
            inputFlag={true}
            inputType={"number"}
            required={true}
            headersExist={false}
          />
          <Input
            header={"Max. number of guests"}
            Subheading={""}
            registerName={"maxGuests"}
            register={register}
            errors={errors}
            inputFlag={true}
            inputType={"number"}
            required={true}
            headersExist={false}
          />
          <Input
            header={"Price per night"}
            Subheading={""}
            registerName={"price"}
            register={register}
            errors={errors}
            inputFlag={true}
            inputType={"number"}
            required={true}
            headersExist={false}
          />
        </div>
      </div>

      <button className="w-full px-5 py-1.5 rounded-full bg-primary text-white active:scale-99">
        Save
      </button>
    </form>
  );
};

export default NewPlacePage;
