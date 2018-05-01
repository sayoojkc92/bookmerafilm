'use strict';

import mongoose from 'mongoose';
import { isString } from 'util';

var BookingendpointSchema = new mongoose.Schema({
  MovieName: String,
  SeatNo: String
});

export default mongoose.model('Bookingendpoint', BookingendpointSchema);
