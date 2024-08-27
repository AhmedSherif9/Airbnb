import express from "express";
import PlaceModel from "../models/Place.js";
import validateJWT from "../middlewares/validateJWT.js";
const router = express.Router();

//post or create a new place
router.post("/", validateJWT, async (request, response) => {
  try {
    const userID = response.locals.JWTData.id;
    const {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = request.body;
    const newPlace = await PlaceModel.create({
      owner: userID,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    response.status(201).json({ place: newPlace });
  } catch (error) {
    console.log("error has taken place");
    response.status(500).send("Something went wrong!");
  }
});

//update a place
router.put("/:id", validateJWT, async (request, response) => {
  try {
    const userID = response.locals.JWTData.id;
    const { id: placeID } = request.params;
    const placeFound = await PlaceModel.findById(placeID);
    if (!placeFound) {
      response.status(404).send("Place is Not found");
      return;
    }
    if (placeFound.owner != userID) {
      response.status(400).send("Can not update this place!!");
      return;
    }
    const updatedPlace = await PlaceModel.findByIdAndUpdate(
      placeID,
      request.body,
      { new: true }
    );
    response.status(201).json({ updatedPlace });
  } catch (error) {
    console.log("error has taken place");
    response.status(500).send("Something went wrong!");
  }
});

//get searched place
router.get("/search", async (request, response) => {
  try {
    const { searchTerm } = request.query;
    const allPlaces = await PlaceModel.find();
    const places = allPlaces?.filter((place) =>
      place?.title.includes(searchTerm)
    );
    response.status(200).json({ places });
  } catch (error) {
    console.log("error has taken place", error);
    response.status(500).send("Something went wrong!");
  }
});

//get a specific user place
router.get("/user-places/:id", validateJWT, async (request, response) => {
  try {
    const userID = response.locals.JWTData.id;
    const { id: placeID } = request.params;
    const placeFound = await PlaceModel.findById(placeID);
    if (!placeFound) {
      response.status(404).send("Place is Not found");
      return;
    }
    if (placeFound.owner != userID) {
      response.status(400).send("Can not update this place!!");
      return;
    }
    response.status(200).json({ place: placeFound });
  } catch (error) {
    console.log("error has taken place");
    response.status(500).send({ error });
  }
});

//get user places
router.get("/user-places", validateJWT, async (request, response) => {
  try {
    const userID = response.locals.JWTData.id;
    const places = await PlaceModel.find({ owner: userID });
    response.status(200).json({ places });
  } catch (error) {
    console.log("error has taken place");
    response.status(500).send({ error });
  }
});

//get a specific place
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const placeFound = await PlaceModel.findById(id);
    if (!placeFound) {
      response.status(404).send("Place is Not Found");
      return;
    }
    response.status(200).json({ place: placeFound });
  } catch (error) {
    console.log("error has taken place");
    response.status(500).send("Something went wrong!");
  }
});

//get all places
router.get("/", async (request, response) => {
  try {
    const places = await PlaceModel.find();
    response.status(200).json({ places });
  } catch (error) {
    console.log("error has taken place");
    response.status(500).send("Something went wrong!");
  }
});

export default router;
