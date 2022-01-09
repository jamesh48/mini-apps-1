import React, { useEffect, useState } from 'react';
import FavoriteSetSelect from './favoriteSetSelect.jsx';

export default ({ entry: { date, description, _id: editID, favoriteSet: eventsFavoriteSets }, editCallback, favoriteSets, addFavoriteCallback, updateCallback, indicator }) => {
  const [editingStateValues, setEditingStateValues] = useState(
    { originalDescription: description, editingDescription: description, editState: false }
  );
  const evaluateDate = (date) => {
    if (date.indexOf('/') > - 1) {
      date = date.slice(date.indexOf('/') + 1) + '/' + date.slice(0, date.indexOf('/'));
    }

    if (date.indexOf('-') > -1) {
      date = date.split('');
      date.splice(date.indexOf('-'), 1);
      date = date.join('') + ' BC';
    } else {
      date += ' AD';
    }
    return date;
  }

  const evaluateDescription = (description) => {
    description = description.split('ampampndash').join('\u2013').split('ampndash').join('\u2013').split('ampquot').join('"')
    return description;
  }

  return !editingStateValues.editState ? (
    <li className='historical-entry'>
      <div className={`inner-entry ${indicator}`}>
        <p>Date: {evaluateDate(date)}</p>
        <p>{evaluateDescription(description)}</p>
        {addFavoriteCallback ?
          <FavoriteSetSelect updateCallback={updateCallback} addFavoriteCallback={addFavoriteCallback} eventsFavoriteSets={eventsFavoriteSets} favoriteSets={favoriteSets} favID={editID} /> : null
        }
        {/* Edit */}
        {editCallback ?
          <button className='edit-button' onClick={() => {
            setEditingStateValues({ ...editingStateValues, editState: true });
          }}>
            Edit
        </button> : null
        }
      </div>
    </li >
  ) : (
    <div>
      <h4 id='editing-header'>Editing...</h4>
      <textarea className='edit-text-area' value={editingStateValues.editingDescription}
        onChange={() => {
          setEditingStateValues({ ...editingStateValues, editingDescription: event.target.value })
        }}></textarea>
      {/* Update */}
      <button className='update-cancel-buttons' onClick={() => {
        setEditingStateValues({ ...editingStateValues, originalDescription: editingStateValues.editingDescription, editState: false })
        editCallback(editingStateValues.editingDescription, editID);
      }}>
        Update Entry
          </button>
      {/* Cancel     */}
      <button className='update-cancel-buttons' onClick={() => {
        setEditingStateValues({ ...editingStateValues, editingDescription: editingStateValues.originalDescription, editState: false })
      }}>
        Cancel
      </button>
    </div >
  )
};

{/* <cite>Benvenuti, Gino. "Le Repubbliche Marinare. Amalfi, Pisa, Genova e Venezia", Newton amp Compton Editori, 1985, Rome</cite> */ }
{/* {'cite book|last=Benvenuti|first=Gino|title=Le Repubbliche Marinare. Amalfi, Pisa, Genova e Venezia|year=1985|publisher=Newton amp Compton Editori|location=Rome|isbn=88-8289-529-7|page=34'} */ }