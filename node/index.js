const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const url = `http://${process.env.mtapi_url}:5000/by-id/1d54,1ccf,6766,9b86,a3a3`
  const { data } = await axios.get(url);

  const subwayList = [
    'A',
    'E',
    'C',
    'F',
    '4',
    '5',
    '6',
    '1',
    '2',
    '3',
    // 'N',
    // 'Q',
    'R',
    'W',
    'M'
  ];

  const subwayObj = { uptown: {}, downtown: {} };

  // Create array for each subway line to make sure we have no more than 2 of each
  subwayList.forEach((subway) => {
    subwayObj.uptown[subway] = [];
    subwayObj.downtown[subway] = [];
  });

  const runningLines = {};

  // Loop through each subway station and add it to the correct array if length is less than 2 and it is at least 2 minutes away
  data.data.forEach((station) => {
    const uptown = station.N;
    const downtown = station.S;
    const {routes} = station;

    uptown.forEach((train) => {
      if (
        !!subwayObj.uptown[train.route] &&
        subwayObj.uptown[train.route].length < 1
      ) {
        const { time } = train;
        const difference = Math.round((new Date(time) - new Date()) / 60000);
        if (difference > 2) {
          subwayObj.uptown[train.route].push({
            route: train.route,
            time: difference,
          });
        }
      }
    });

    downtown.forEach((train) => {
      if (
        !!subwayObj.downtown[train.route] &&
        subwayObj.downtown[train.route].length < 1
      ) {
        const { time } = train;
        const difference = Math.round((new Date(time) - new Date()) / 60000);
        if (difference > 2) {
          subwayObj.downtown[train.route].push({
            route: train.route,
            time: difference,
          });
        }
      }
    });

    routes.forEach(route => {
      runningLines[route] = true;
    });
  });

  // Find the lines that are not running at all
  subwayList.forEach(subway => {
    if (!runningLines[subway]) {
      subwayObj.uptown[subway] = [{
        route:subway,
        time: 'none'
      }];
      subwayObj.downtown[subway] = [
        {
          route:subway,
          time: 'none'
        }
      ];
    }
  })

  // Fill in the empty subway lines
  subwayList.forEach((subway) => {
    if(subwayObj.uptown[subway].length === 0) {
      subwayObj.uptown[subway].push({
        route:subway,
        time: '-'
      })
    }
    if(subwayObj.downtown[subway].length === 0) {
      subwayObj.downtown[subway].push({
        route:subway,
        time: '-'
      })
    }
  });
  
  res.json(subwayObj)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
