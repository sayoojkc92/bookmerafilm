'use strict';

import mongoose from 'mongoose';

var MappingendpointSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Mappingendpoint', MappingendpointSchema);
