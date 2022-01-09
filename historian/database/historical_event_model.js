const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historicalEventSchema = new Schema({
  date: String,
  description: String,
  lang: String,
  category1: String,
  category2: String,
  granularity: String,
  favoriteSet: {
    type: 'array',
    items: { type: 'string', uniqueItems: true }
  }
});

const HistoricalEvent = mongoose.model('HistoricalEvent', historicalEventSchema);

module.exports = HistoricalEvent;