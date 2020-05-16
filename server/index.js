const express = require('express')
const app = express()

app.use(require('cors')())  // 跨域专用
app.use(express.json())
require('./plugins/db')(app)

require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})