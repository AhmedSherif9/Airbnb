import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BookingWidget = ({ place, setShowModal }) => {
  const { isAuthenticated } = useAuth();

  const { register, handleSubmit, formState, getValues, setValue } = useForm();
  const { errors } = formState;

  const { id } = useParams();
  const [disabledDates, setDisabledDates] = useState([]);

  const fetchDates = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/bookings/dates/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDisabledDates(data);
    } catch (error) {
      console.error("error is ", error);
    }
  };

  useEffect(() => {
    fetchDates();
  }, []);

  const errorClasses = () => {
    return "text-error text-xs";
  };

  const submit = async (data) => {
    try {
      toast.loading("Booking The Place", {
        id: "booking",
        duration: 9000,
      });
      const checkOut = getValues("checkOut");
      const checkIn = getValues("checkIn");
      if (checkOut < checkIn) {
        throw new Error("Check-out must be after Check-in");
      }
      const differenceInMs = checkOut - checkIn;
      const differenceInDays = differenceInMs / (1000 * 3600 * 24);
      if (differenceInDays < 2) {
        throw new Error("At least 2 nights to be reserved");
      }
      const price = differenceInDays * place?.price;
      data.price = price;
      data.place = place?._id;
      const response = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (response.status != 201) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      toast.success("Place Is Booked Successfully", {
        id: "booking",
        duration: 3000,
      });
      fetchDates();
    } catch (error) {
      console.error(`error is ${error}`);
      toast.error(`${error.message}`, { id: "booking", duration: 3000 });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(isAuthenticated && submit)}
      className="bg-gray-300 flex flex-col gap-3 rounded-2xl py-4 px-1.5 
      shadow-lg shadow-gray-400 dark:bg-gray-900"
    >
      <div className="text-xl font-semibold mx-auto">
        {`Price: $${place?.price} ${"/"} per night`}
      </div>

      <div className="w-11/12 mx-auto flex flex-col gap-2 ">
        <div className="flex justify-between">
          <label className="flex flex-col">
            Check-In:
            <DatePicker
              className="w-32 p-1 rounded-md dark:bg-gray-800"
              selected={getValues("checkIn") || null}
              onChange={(date) =>
                setValue("checkIn", date, { shouldValidate: true })
              }
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              minDate={addDays(new Date(), 1)}
              excludeDates={disabledDates.map((date) => new Date(date))}
            />
            <input
              type="hidden"
              {...register("checkIn", {
                required: "Check-in is required",
              })}
            />
            <p className={errorClasses()}>
              {isAuthenticated && errors.checkIn
                ? `*${errors.checkIn?.message}`
                : ""}
            </p>
          </label>

          <label className="flex flex-col">
            Check-Out:
            <DatePicker
              className="w-32 p-1 rounded-md dark:bg-gray-800"
              selected={getValues("checkOut") || null}
              onChange={(date) =>
                setValue("checkOut", date, { shouldValidate: true })
              }
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              minDate={addDays(new Date(), 1)}
              excludeDates={disabledDates.map((date) => new Date(date))}
            />
            <input
              type="hidden"
              {...register("checkOut", {
                required: "Check-out is required",
              })}
            />
            <p className={errorClasses()}>
              {isAuthenticated && errors.checkOut
                ? `*${errors.checkOut?.message}`
                : ""}
            </p>
          </label>
        </div>

        <label className="flex flex-col w-full">
          Number of guests:
          <input
            type="number"
            {...register("noOfGuests", {
              min: {
                value: 0,
                message: "number of guests has to be greater than or equal 0",
              },
              max: {
                value: place?.maxGuests,
                message: `number of guests has to be less than or equal ${place?.maxGuests}`,
              },
            })}
            className="p-1 rounded-lg dark:bg-gray-800"
          />
          <p className={errorClasses()}>
            {isAuthenticated && errors.noOfGuests
              ? `*${errors.noOfGuests?.message}`
              : ""}
          </p>
        </label>
      </div>

      <button
        onClick={() => !isAuthenticated && setShowModal(true)}
        className="w-11/12 mx-auto px-4 py-1.5 bg-primary dark:bg-primaryDark rounded-xl
       text-white font-semibold dark:text-gray-800"
      >
        Book this place
      </button>
    </form>
  );
};

export default BookingWidget;
