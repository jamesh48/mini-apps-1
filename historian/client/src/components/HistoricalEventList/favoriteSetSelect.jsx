import React, { useState } from 'react';


export default ({ eventsFavoriteSets, favoriteSets, addFavoriteCallback, favID }) => {
  // const [provisionalSets, setProvisionalSets] = useState(favoriteSets);
  console.log('rendering props');
  return (
    <select className='favorite-set-select' value='Add to Favorite Set:' data-favid={favID} onChange={({ target: { value } }) => {
      if (value === 'Add New Favorite Set!') {
        const newSet = window.prompt('Enter set name!');
        if (!newSet) {
          return;
        }
        addFavoriteCallback.call(newSet, event);
      } else {
        addFavoriteCallback(event);
      }
    }}>
      <option>Add to Favorite Set:</option>
      {favoriteSets.reduce((total, set, i, arr) => {
        // Make an already favorited option just once
        if ((eventsFavoriteSets.includes(set)) && total[1] === false) {
          total = [[...total[0], <option disabled key={i}>-Already Favorited-</option>, <option disabled key={arr.length}>+{set}</option>], true];
          // Push existing favorite sets to the end
        } else if (eventsFavoriteSets.includes(set)) {
          total[0] = [...total[0], <option disabled key={i}>+{set}</option>];
          // And possible new favorite sets to the beginning
        } else {
          total[0] = [<option key={i}>{set}</option>, ...total[0]];
        }
        // If there are more sets return the total w/flag, otherwise return just the array;
        return arr[i] ? total : total[0];
      }, [[], false])}
      <option>Add New Favorite Set!</option>
    </select>
  )
}
