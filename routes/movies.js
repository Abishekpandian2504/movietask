const { Genre } = require("../models/genre");
const { Movie, validate } = require("../models/movie");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
  
    if (!movie)
      return res.status(404).send("The movie with the given ID was not found.");
  
    res.send(movie);
  });

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
 // console.log(genreId);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  //let movie = new Movie({
    const movie = new Movie({
    moviename: req.body.moviename,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    rating: req.body.rating,
    cast: req.body.cast,
  });
  await movie.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      moviename: req.body.moviename,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    rating: req.body.rating,
    cast: req.body.cast,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.delete("/:id", async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
  
    if (!movie)
      return res.status(404).send("The movie with the given ID was not found.");
  
    res.send(movie);
  });

module.exports = router;


