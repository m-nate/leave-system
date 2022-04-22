const express = require('express')
const _ = require('lodash')

const app = express();

//listen for requests
app.listen(3000);

app.get('/about')