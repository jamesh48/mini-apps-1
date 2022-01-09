const express = require('express');
const app = express();
const path = require('path');
const db = require('../database/controllers.js');
const cors = require('cors');
app.use(cors());
app.use('*', (req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
})
app.use(express.static(path.resolve('client/public')));

app.get('/data', async ({ query }, res, next) => {
  const results = await db.search(query)
  res.send(results);
})

// app.get('/getFavoriteSets', async (req, res) => {
// let favoriteSets = await db.getFavoriteSets();
// favoriteSets = favoriteSets.reduce((total, item) => {
//   return [...total, item.name]
// }, [])
// res.send(favoriteSets);
// })

app.get('/fromFS', async ({ query }, res) => {
  const result = await db.findFromFavoriteSet(query);
  res.send(result);
})

app.post('/addFSTable', async ({ query }, res) => {
  const result = await db.addFavoriteSetToTable(query);
  res.send(result);
})

// app.patch('/addFSDoc', async ({ query }, res) => {
//   const result = await db.addFavoriteSetToDoc(query)
//   res.send(result);
// });
app.patch('/:q', async ({ query }, res) => {
  console.log(query)
  const result = await db.patch(Object.entries(query));
  // res.send(result);
  res.send('ok');
})



app.listen(8000, () => {
  console.log('App listening on port 8000')
})