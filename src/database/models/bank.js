import mongoose from 'mongoose';

//create geo location schema
const GeoSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
  },
});

//create Banks Schema and Models
const bankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: (true, 'Name Field is required'),
  },
  states: {
    type: [String],
    required: (true, 'State Field is required'),
  },
  id: {
    type: String,
    required: (true, 'ID is required'),
  },

  //add in Geo Location of Banks
  geometry: GeoSchema,
});

export default mongoose.model('Bank', bankSchema);
