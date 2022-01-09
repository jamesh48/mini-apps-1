import React, { useState, useEffect } from 'react';
import HistoricalEntry from './historicalEntry.jsx';
import Pagination from './pagination.jsx';

export default ({ historicalEntries, offsetCallback, numberOfPages, searchQuery, editCallback, favoriteSets, addFavoriteCallback, updateCallback }) => {
  return (
    <div>
      <h2 id={historicalEntries.length ? 'validated-title' : null}>Historical Entries for {searchQuery}</h2>
      {historicalEntries.length ?
        <ul className='historical-event-list'>
          {historicalEntries.map((entry, i) => {
            return <HistoricalEntry key={i} entry={entry} editCallback={editCallback} favoriteSets={favoriteSets} addFavoriteCallback={addFavoriteCallback} updateCallback={updateCallback} />
          })}
          <Pagination numberOfPages={numberOfPages} offsetCallback={offsetCallback} />
        </ul>
        : null}
    </div>
  )
};

// db.historicalevents.createIndex(
//   { favoriteSet: "text" },
// );