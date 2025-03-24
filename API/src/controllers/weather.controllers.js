
const { exec } = require('child_process')

const pool = require('../database/database.connection')

// obtener los ultimos 12 registros
const getWeather = async (req, res)=>{
	const resp = await pool.query('SELECT * FROM weather ORDER BY time DESC LIMIT 24;')
	if (resp.rows.length === 0){
		let formatResponse = {
			code: 1,
			message: "Error al intentar obetener los datos",
			data: []
		} 
		return res.status(400).json(formatResponse)
	}
	let formatResponse = {
		code: 0,
		message: "Datos Obtenidos con exito",
		data: resp.rows
	} 
	//este console.loge puede ir a un archivo de logs
	console.log('Peticion realizada - getWeather - latest')
	return res.json(formatResponse)
}


//obtener Todos los registros de un dia en especifico 
const getWeatherByDay = async (req, res) => {
	const {date} = req.body
	const resp = await pool.query(`select * from weather where time::date = '${date}'`)
	if (resp.rows.length === 0){
		let formatResponse = {
			code: 1,
			message: "No se tienen registros guardados sobre el dia indicado",
			data: []
		} 
		return res.status(400).json(formatResponse)
	}
	let formatResponse = {
		code: 0,
		message: "Datos Obtenidos con exito",
		data: resp.rows
	} 
	//este console.loge puede ir a un archivo de logs
	console.log(`Peticion realizada - getWeatherByDay - ${date}`)
	return res.json(formatResponse)
} 

const updateWeatherDB = async (req, res) =>{
	
	const python = '/Users/iramalexanderalfarosoto/Desktop/ProyectosPersonales/PYTHON/pruebaTecnica/Cleaning/venv/bin/python3'
	const pythonPath = '/Users/iramalexanderalfarosoto/Desktop/ProyectosPersonales/PYTHON/pruebaTecnica/Cleaning/data_cleaner.py';
	exec(`${python} ${pythonPath}`, (error, stdout, stderr)=>{
		if (error){
			console.log(`Erro al ejecutar el script: ${error.message}`)
			let formatResponse = {
				code: 3,
				message: "Erro al ejecutar el script",
				data: []
			} 
			return res.status(500).json(formatResponse)
		}
		if (stderr){
			console.warn(`stderr: ${stderr}`)
		}
		console.log(`stdout: ${stdout}`)
		let formatResponse = {
			code: 0,
			message: "Ejecutado Correctamente",
			data: []
		} 
		return res.status(200).json(formatResponse)
	});
}


// exprtar 
module.exports = {
	getWeather,
	getWeatherByDay,
	updateWeatherDB
}