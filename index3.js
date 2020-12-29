require('newrelic');
const express = require('express')
const axios = require('axios')
const got = require('got');

const client = got.extend({
  prefixUrl: 'http://localhost:3001'
});

const app = express()
const port = 3000

app.get('/', async (req, res, next) => {
  try {
    const res2 = await client.get('bad')
    return res2
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) => {
  res.status(500).send('oops')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port} with got`))
