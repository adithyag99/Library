  
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express') //express - contains codes required to create the connection
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyparser = require('body-parser')

const indexRouter = require('./routes/index')
const bookRouter = require('./routes/books')



app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyparser.urlencoded({limit:'10mb',extended:false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/',indexRouter)
app.use('/books',bookRouter)

app.listen(process.env.PORT || 3000)