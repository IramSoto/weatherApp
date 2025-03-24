const { Router } = require('express')
const weatherControl = require('../controllers/weather.controllers')

const router = Router()

//obtencion de datos
router.get('/', weatherControl.getWeather)
router.post('/byDay/', weatherControl.getWeatherByDay)
router.post('/update/', weatherControl.updateWeatherDB)


// exportar el router
module.exports = router