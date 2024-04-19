require('dotenv').config()

const express = require('express')
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const connectDB = require('./server/config/db')

const app = express()
const port = process.env.PORT ;

//conect database
connectDB();

//middleware
app.use(express.urlencoded({extended:true})) 
app.use(express.json()) 
app.use(methodOverride('_method'))

//static fails
app.use(express.static('public')); 

//templating engine 
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

//Routes 
app.use('/', require ('./server/routes/Customer'))


//Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404')
})


app.listen(port, () => {
    console.log(`App listening on port`, process.env.PORT); 
})