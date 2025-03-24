import axios from 'axios'

const API_URL = 'http://127.0.0.1:3000/api/weather/'

export async function getLatestWeather() {
	const res = await axios.get(`${API_URL}`);
	return res.data;
} 

export async function getWeatherByDay(date){
	const res = await axios.post(`${API_URL}byDay`, {date})
	return res.data;
}

export async function triggerUpdateData(){
	const res = await axios.post(`${API_URL}update`);
	return res.data
}