const BookingWidget = ({ place }) => {
  return (
    <article
      className="bg-gray-300 flex flex-col gap-3 rounded-2xl py-4 px-1.5 
      shadow-lg shadow-gray-400"
    >
      <div className="text-xl font-semibold mx-auto text-black">
        {`Price: $${place?.price} ${"/"} per night`}
      </div>

      <div className="w-11/12 grid grid-rows-2 mx-auto text-black gap-2">
        <div className="grid grid-cols-2 gap-2">
          <label>
            Check-in:
            <input type="date" className="rounded-md" />
          </label>

          <label>
            Check-out:
            <input type="date" className="rounded-md" />
          </label>
        </div>
        <label>
          Number of guests:
          <input type="number" className="w-full py-0.5 rounded-lg" />
        </label>
      </div>

      <button
        className="w-11/12 px-4 py-1.5 bg-primary mx-auto
   rounded-xl text-white font-semibold"
      >
        Book this place
      </button>
    </article>
  );
};

export default BookingWidget;
