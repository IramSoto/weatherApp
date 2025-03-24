const express = require("express")
const cors = require("cors")
require('dotenv').config()

class Server{
	constructor(){

		//variables
		this.app = express()
		this.port = process.env.PORT

		//variables de rutas
		this.weatherPath = "/api/weather"
		
		//middelwares
		this.middelwares()
		//router
		this.routes()
	}
	middelwares(){
		this.app.use(cors())
		this.app.use(express.json())
		this.app.use(express.static("public"))
	}
	routes(){
		this.app.use(this.weatherPath, 	require('../routes/weather.routes'))
	}
	listen(){
		this.app.listen(this.port, ()=>{
			console.log("Servidor Corriendo en el puerto: ", this.port)
		})
	}
}
module.exports = Server