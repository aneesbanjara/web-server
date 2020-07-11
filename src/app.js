const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')


const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

const viewsPath = path.join('__dirname', '../templates/views')

const partialsPath = path.join('__dirname', '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)                                 

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index',{
    title: 'weather page',
    name: 'Anish banjara'
  })
})

app.get('/about', (req, res) => {
  res.render('about',{
    title: 'About',
    name: 'Anish banjara'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help page',
    name: 'Anish banjara'
  })
})


app.get('/weather', (req, res) => {

 if (!req.query.address) {
  return res.send({
    error: 'You must provide an address'
  })
 }

 geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
  if (error) {
    return res.send({error})
  }
  forcast(latitude, longitude, (forcastData, error) => {
    if (error) {
      return res.send({error})
    }
    res.send({
      location: location,
      forcast: forcastData
    })
  })
})
})

app.get('/products', (req, res) => {

  if(!req.query.search) {
   return res.send({
      error: 'you must provide the search term'
    })
  }
  res.send({
    title: 'this is the response'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Anish banjara',
    errMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Anish banjara',
    errMessage: 'page not found'
  })
})

app.listen(port, () => {
  console.log('connected to port 3000')
})