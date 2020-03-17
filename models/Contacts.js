const mongoose = require('mongoose');
const {Schema} = mongoose;

const contactSchema = new Schema({
  name: String,
  phone: String,
  isFavorite: Boolean,
});

mongoose.model('contacts', contactSchema);