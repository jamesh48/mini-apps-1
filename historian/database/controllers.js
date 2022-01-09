const path = require('path');
const db = require(path.resolve(__dirname + '/mongoDB.js'));
const HistoricalEvent = require('./historical_event_model.js');
const FavoriteSet = require('./favorite_set_model.js');

const mongoose = require('mongoose');
const connection = mongoose.connection;
// mongoose.set(`useFindAndModify`, false);

module.exports = {
  search: async ({ searchQuery, offset, limit }) => {
    const historicalResults = await HistoricalEvent.find({ category2: searchQuery });

    const numberOfResults = historicalResults.length;

    let favoriteSets = await FavoriteSet.find({});
    favoriteSets = favoriteSets.reduce((total, item) => {
      return [...total, item.name]
    }, []);

    return {
      favoriteSets: favoriteSets,
      results: historicalResults.slice(Number(offset), Number(offset) + Number(limit)),
      totalPages: Math.ceil(numberOfResults / limit)
    };
  },

  patch: async ([[x, id], [name, value]]) => {
    if (name === 'favoriteSet') {
      const existingSetTest = await FavoriteSet.find({ name: value });
      if (existingSetTest.length === 0) {
        await module.exports.addFavoriteSetToTable(value);
      }
      try {
        const updatedSet = await HistoricalEvent.findOneAndUpdate(
          { _id: id },
          {
            $addToSet: { [name]: value },
          }, {
          new: true
        }
        )
        return updatedSet;
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const updatedEvent = await HistoricalEvent.findOneAndUpdate({ _id: id }, {
          [name]: value
        }, { new: true });

        return updatedEvent;
      } catch (err) {
        return err;
      }
    }
  },

  // getFavoriteSets: async () => {
  //   const result = await FavoriteSet.find({});
  //   return result;
  // },

  addFavoriteSetToTable: async (name) => {
    const result = await FavoriteSet.create({ name: name });
    return result;
  },

  findFromFavoriteSet: async ({ favoriteSet }) => {
    const result = await HistoricalEvent.find({ $text: { $search: favoriteSet } });
    return result;
  },
};
