const path = require('path');
const express = require('express');
const app = express();


app.use(express.static(path.resolve('client/public')));

const port = 7000;
app.listen(port, () => {
   console.log(`Crypto App listening on port ${port}`)
})

