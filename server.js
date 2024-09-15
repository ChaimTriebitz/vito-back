require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json({ limit: '500mb' }))
app.use(express.urlencoded({ extended: true, limit: '500mb' }))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))

app.use(require('./middleware/error'))

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
   .then(() =>
      app.listen(PORT, () => {
         console.log('listening on port', PORT)
      })
   ).catch((err) => console.log(err))
