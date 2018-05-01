'use strict';

import mongoose from 'mongoose';

var MovieendpointSchema = new mongoose.Schema({
  MovieName: String,
  Genre: String,
  Year: Number
});

export default mongoose.model('moviesCtrl.Movies', MovieendpointSchema);


