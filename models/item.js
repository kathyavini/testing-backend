const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, required: true },
  due: { type: Date },
});

module.exports = mongoose.model('Item', ItemSchema);
