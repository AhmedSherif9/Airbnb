import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema({
  place: { type: Schema.Types.ObjectId, required: true, ref: "Place" },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  checkIn: { type: Number, required: true },
  checkOut: { type: Number, required: true },
  price: Number,
});

const BookingModel = mongoose.model("Booking", BookingSchema);

export default BookingModel;
