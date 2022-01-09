import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ searchCallback }) => {
  return (
    <input type='text' onChange={searchCallback}></input>
  )
}