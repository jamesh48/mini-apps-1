import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchBar.jsx';
import HistoricalEventList from './components/HistoricalEventList/historicalEventList.jsx';
import axios from 'axios';
import FavoriteSetTab from './FavoriteSets.jsx';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default () => {
  const [historicalEntries, setHistoricalEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [favoriteSets, setFavoriteSets] = useState([]);
  const [updater, setUpdater] = useState(false);

  useEffect(async () => {
    console.log('rerender');
    const { data: { favoriteSets, results, totalPages } } = await axios('/data', { params: { searchQuery, offset, limit: 10 } });
    //total favorite sets;
    setFavoriteSets(favoriteSets);
    setNumberOfPages(totalPages);
    setHistoricalEntries(results);
  }, [searchQuery, offset, updater])

  const searchCallback = async (e) => {
    setSearchQuery(e.target.value);
  };

  const offsetCallback = (inboundOffset) => {
    setOffset(inboundOffset);
  }

  const addFavoriteCallback = async function ({ target: { value, dataset: { favid } } }) {
    const newFavoriteSet = await axios.patch(`q?id=${favid}&favoriteSet=${this ? this : value}`);
    setFavoriteSets((existingFavoriteSets) => {
      return [...existingFavoriteSets, newFavoriteSet.favoriteSet];
    })
    setUpdater((existingBoolean) => {
      return !existingBoolean;
    });

  }

  const editCallback = async (updatedDescription, id) => {
    let provisionalEntries = historicalEntries.map((item) => {
      return { ...item, description: item._id === id ? updatedDescription : item.description }
    });
    setHistoricalEntries(provisionalEntries);
    const result = await axios.patch(`q?id=${id}&description=${updatedDescription}`)
  }

  return (
    <div>

      <Router>
        <div>
          <nav>
            <ul className='favorite-options-list'>
              <li className='favorite-options-list-li li-header'>Favorites List: </li>
              {favoriteSets.map((set, i) => {
                return (
                  <li key={i} className='favorite-options-list-li'>
                    <Link to={`/${set}`}>{set}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <Switch>
            {favoriteSets.map((set, i) => {
              return (
                <Route key={i} path={`/${set}`}>
                  <FavoriteSetTab lookupSet={set} />
                </Route>
              )
            })}
          </Switch>
        </div>
      </Router>
      <h4>Lets Find some Historical Events!</h4>
      <SearchBar searchCallback={searchCallback} />
      <HistoricalEventList historicalEntries={historicalEntries} offsetCallback={offsetCallback} editCallback={editCallback} numberOfPages={numberOfPages} searchQuery={searchQuery} favoriteSets={favoriteSets} addFavoriteCallback={addFavoriteCallback} />
    </div>
  )
}