import React, { useState, useEffect } from 'react';
import FavoriteEntry from './components/HistoricalEventList/historicalEntry.jsx';
import axios from 'axios';
export default ({ lookupSet }) => {
  const [localFavorites, setLocalFavorites] = useState([]);
  useEffect(async () => {
    const { data } = await axios.get('/fromFS', { params: { favoriteSet: lookupSet } });
    setLocalFavorites(data);
  });

  return localFavorites.length > 0 ? (
    <div>
      <h4>Favorite results for "{lookupSet}" set</h4>
      <ul className='historical-event-list'>{localFavorites.map((entry, i) => {
        return <FavoriteEntry key={i} entry={entry} indicator={'favorite'} />
      })}</ul>
    </div>
  ) : <h4>No favorite results found...</h4>
}
