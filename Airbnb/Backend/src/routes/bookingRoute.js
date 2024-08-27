import express from "express";
import BookingModel from "../models/Booking.js";
import PlaceModel from "../models/Place.js";
import validateJWT from "../middlewares/validateJWT.js";

const router = express.Router();

//Create A Booking
router.post("/", validateJWT, async (request, response) => {
  try {
    const userID = response.locals.JWTData.id;
    const { place, name, phone, checkIn, checkOut, price } = request.body;
    const placeFound = await PlaceModel.findById(place);
    if (!placeFound) {
      response.status(404).send("Place is Not Found");
      return;
    }
    const newBooking = await BookingModel.create({
      place,
      user: userID,
      name,
      phone,
      checkIn,
      checkOut,
      price,
    });
    response.status(201).json({ booking: newBooking });
  } catch (error) {
    console.log("error has taken place");
    response.status(500).send("Something went wrong!");
  }
});

//Get A Booking of Mine
router.get("/:id", validateJWT, async (request, response) => {
  try {
    const userID = response.locals.JWTData.id;
    const { id } = request.params;
    const booking = await BookingModel.findById(id).populate("place");
    if (!booking) {
      response.status(404).send("Booking is Not Found");
      return;
    }
    if (booking.user != userID) {
      response.status(500).send("Not a Booking of yours!!");
      return;
    }
    response.status(200).json({ booking });
  } catch (error) {
    console.log("error has taken place");
    response.status(500).send("Something went wrong!");
  }
});

//Get All My Bookings
router.get("/", validateJWT, async (request, response) => {
  try {
    const userID = response.locals.JWTData.id;
    const bookings = await BookingModel.find({ user: userID }).populate(
      "place"
    );
    response.status(200).json({ bookings });
  } catch (error) {
    console.log("error has taken place");
    response.status(500).send("Something went wrong!");
  }
});

export default router;
