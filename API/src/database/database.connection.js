const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
	connectionString: process.env.DBURL
})

module.exports = pool