const mongoose = require('mongoose');
const Joi = require("joi");
const {genreSchema}= require('./genre');
 
const Movie = mongoose.model('Movies', new mongoose.Schema ({
    moviename: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    cast: [{
      actor: {
          type: String,
          required: true
        }, 
        actress: {
          type: String,
          required: true
        },
       
        singer: {
          type: String,
          required: true
        },
      }],
    rating: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 10
      },
      date: { type: Date, default: Date.now },
    
  }));

  function validateMovie(movie) {
    const schema = {
        moviename: Joi.string()
        .min(5)
        .max(50)
        .required(),
      genreId: Joi.objectId().required(),
      rating: Joi.number().min(1).required(),
     
    };
    return Joi.validate(movie, schema);
  }

exports.Movie = Movie;
exports.validate = validateMovie; 
  