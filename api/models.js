const Mongoose = require('mongoose');

module.exports = {
  Album: Mongoose.model('Albuns', new Mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    stickers: {
      type: Mongoose.Schema.Types.Mixed,
      default: {}
    }})
  )
};
