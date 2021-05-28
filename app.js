const { response, json } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const model = require('./model')
require('dotenv').config()
const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

let cityName = 'İzmir'
app.get('/', (req, res) => {
  const city = cityName
  const apiKey = process.env.API_KEY
  const units = 'metric'

  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&units=' +
    units +
    '&appid=' +
    apiKey

  https.get(url, (response) => {
    response.on('data', (data) => {
      const jsonData = JSON.parse(data)
      res.render('home', {
        weather: model.weather(jsonData),
      })
    })
  })
})

app.post('/', (req, res) => {
  cityName = req.body.cityName
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('Port 3000 online...')
})
