const express = require('express')
const app = express()
const port = 3001

app.get('/bad', async (req, res) => {
  res.status(502)
  return res.send('Ooops')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
