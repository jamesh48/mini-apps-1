const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSetSchema = new Schema({
  name: String,
});

const FavoriteSet = mongoose.model('FavoriteSet', favoriteSetSchema);

module.exports = FavoriteSet;