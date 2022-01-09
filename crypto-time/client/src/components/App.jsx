import React, { useState, useEffect, useRef } from 'react';
import Title from './Title.jsx';
import { Line } from 'react-chartjs-2'
import axios from 'axios';

export default () => {
  const [dates, setDates] = useState([]);
  const [closingRates, setClosingRates] = useState([]);

  useEffect(async () => {
    const { data: { bpi } } = await axios('https://api.coindesk.com/v1/bpi/historical/close.json');
    setDates(Object.keys(bpi));
    setClosingRates(Object.values(bpi));
  }, []);

  return (
    <div id='line-graph-container'>
      <Title />
      <div id='line-graph-chart'>
        <Line
          className='child'
          data={{
            labels: dates,
            datasets: [{
              label: 'Crypto Value',
              data: closingRates,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                //   // 'rgba(54, 162, 235, 1)',
                //   // 'rgba(255, 206, 86, 1)',
                //   // 'rgba(75, 192, 192, 1)',
                //   // 'rgba(153, 102, 255, 1)',
                //   // 'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          }}
        />
      </div>

    </div>
  )
}