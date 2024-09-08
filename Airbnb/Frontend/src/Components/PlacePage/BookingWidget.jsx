import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";

const BookingWidget = ({ place, setShowModal }) => {
  const { isAuthenticated } = useAuth();

  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  const errorClasses = () => {
    return "text-error text-xs";
  };

  const submit = async (data) => {
    data.place = place?._id;
    //console log 1
    try {
      toast.loading("Booking The Place", {
        id: "booking",
        duration: 9000,
      });
      const checkOut = new Date(getValues("checkOut"));
      const checkIn = new Date(getValues("checkIn"));
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
      //console log 2
      toast.success("Place Is Booked Successfully", {
        id: "booking",
        duration: 3000,
      });
    } catch (error) {
      console.error(`error is ${error}`);
      toast.error(`${error.message}`, { id: "booking", duration: 3000 });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(isAuthenticated && submit)}
      className="bg-gray-300 flex flex-col gap-3 rounded-2xl py-4 px-1.5 
      shadow-lg shadow-gray-400"
    >
      <div className="text-xl font-semibold mx-auto text-black">
        {`Price: $${place?.price} ${"/"} per night`}
      </div>

      <div className="w-11/12 mx-auto flex flex-col gap-2 text-black">
        <div className="flex justify-between">
          <label className="flex flex-col w-32">
            Check-in:
            <input
              type="date"
              {...register("checkIn", {
                required: {
                  value: true,
                  message: "check-in is required",
                },
              })}
              className="p-1 rounded-md"
            />
            <p className={errorClasses()}>
              {isAuthenticated && errors.checkIn
                ? `*${errors.checkIn?.message}`
                : ""}
            </p>
          </label>

          <label className="flex flex-col w-32">
            Check-out:
            <input
              type="date"
              {...register("checkOut", {
                required: {
                  value: true,
                  message: "check-out is required",
                },
              })}
              className="p-1 rounded-md"
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
            className="p-1 rounded-lg"
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
        className="w-11/12 mx-auto px-4 py-1.5 bg-primary rounded-xl
       text-white font-semibold"
      >
        Book this place
      </button>
    </form>
  );
};

export default BookingWidget;
