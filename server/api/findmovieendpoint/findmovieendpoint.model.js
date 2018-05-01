'use strict';

import mongoose from 'mongoose';

var MovieendpointSchema = new mongoose.Schema({
  Poster:String,
  MovieName:String,
  Genre: Array,
  Year: String,
  Duration:Number,
  Active:Boolean,
  Theatres: Array,
  Cities: Array,
  Timings: Array,
  Dates: Array
});

export default mongoose.model('Movie', MovieendpointSchema);
