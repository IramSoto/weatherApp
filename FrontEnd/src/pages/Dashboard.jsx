import { useEffect, useState } from 'react';
import { getLatestWeather, getWeatherByDay, triggerUpdateData } from '../services/weatherService';
import LineCart from '../components/LineCart';
import BarChart from '../components/BarChart';

const Dashboard = () => {
	const [isLoading, setIsLoading] = useState(true);

	const [timeGT, setTimeGT] = useState([]);
	const [tempdataGT, setTempDataGT] = useState([]);
	const [humedadGT, setHumedadGT] = useState([]);
	const [allWeatherDataGT, setAllWeatherDataGT] = useState([]);

	const [timeR, setTimeR] = useState([]);
	const [humedadR, setHumedadR] = useState([]);
	const [tempdataR, setTempDataR] = useState([]);
	const [allWeatherDataR, setAllWeatherDataR] = useState([]);

	const fetchWeather = async (dataSource) => {
		try {
			setIsLoading(true);
			const response = await dataSource();
			if (!response || !Array.isArray(response.data)) {
				console.error('La respuesta no tiene un array en "data"');
				return;
			}

			const data = response.data;

			const filterByLocation = (location) => data.filter(item => item.location === location);

			const processData = (locationData) => {
				const tempMax = locationData.map(item => item.temp_maxc);
				const tempMin = locationData.map(item => item.temp_minc);
				const temp = locationData.map(item => item.tempc);
				const time = locationData.map(item => item.time);
				const humidity = locationData.map(item => item.humidity);

				return {
					time,
					tempData: [
						{ label: 'Temp. Máxima', data: tempMax, borderColor: 'red', backgroundColor: 'rgba(255, 0, 0, 0.3)', tension: 0.1 },
						{ label: 'Temp. Mínima', data: tempMin, borderColor: 'blue', backgroundColor: 'rgba(0, 0, 255, 0.3)', tension: 0.1 },
						{ label: 'Temperatura', data: temp, borderColor: 'green', backgroundColor: 'rgba(0, 255, 0, 0.3)', tension: 0.1 }
					],
					humidityData: [
						{ label: 'Humedad', data: humidity, borderColor: 'Blue', backgroundColor: 'rgba(0, 0, 255, 0.3)', tension: 0.1 }
					],
					allData: locationData
				};
			};

			const guateData = processData(filterByLocation("Guatemala City"));
			const retalData = processData(filterByLocation("Retalhuleu"));

			setTimeGT(guateData.time);
			setTempDataGT(guateData.tempData);
			setHumedadGT(guateData.humidityData);
			setAllWeatherDataGT(guateData.allData);

			setTimeR(retalData.time);
			setTempDataR(retalData.tempData);
			setHumedadR(retalData.humidityData);
			setAllWeatherDataR(retalData.allData);

		} catch (error) {
			console.error('Error al obtener datos del clima:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchWeather(getLatestWeather);
	}, []);

	const handleByDay = async () => {
		const fecha = prompt("Introduce la fecha (YYYY-MM-DD):");
		if (fecha) {
			await fetchWeather(() => getWeatherByDay(fecha));
		}
	};

	const handleUpdateData = async () => {
		try {
			await triggerUpdateData();
			alert("Datos actualizados correctamente desde el backend.");
		} catch (error) {
			alert("Error al ejecutar la actualización de datos.");
			console.error(error);
		}
	};

	const isChartReadyGT = timeGT.length > 0 && tempdataGT.length > 0;
	const isChartReadyR = timeR.length > 0 && tempdataR.length > 0;

	return (
		<div className="container mx-auto pt-16 pl-32 pr-32">
			<h1 className="text-sky-200 text-7xl"> Dashboard </h1>

			<div className="flex justify-between pt-5">
				<div>
					<button onClick={() => fetchWeather(getLatestWeather)} className="bg-sky-400 hover:bg-sky-700 hover:text-sky-50 text-sky-950 font-bold py-2 px-4 rounded-full mr-3">
						Latest Data
					</button>

					<button onClick={handleByDay} className="bg-sky-400 hover:bg-sky-700 hover:text-sky-50 text-sky-950 font-bold py-2 px-4 rounded-full mr-3">
						By Day
					</button>
				</div>

				<button onClick={handleUpdateData} className="bg-sky-400 hover:bg-sky-700 hover:text-sky-50 text-sky-950 font-bold py-2 px-4 rounded-full mr-3">
					Update Data
				</button>
			</div>

			<div className='flex gap-6'>
				<div className='w-1/2'>
					{isLoading ? (
						<p className="text-sky-100 mt-6">Cargando datos del clima...</p>
					) : isChartReadyGT ? (
						<div className="p-6">
							<LineCart
								title="Temperatura en Ciudad de Guatemala"
								labels={timeGT}
								dataset={tempdataGT}
							/>
						</div>
					) : (
						<p className="text-red-500 mt-6">No hay datos suficientes para mostrar el gráfico.</p>
					)}
				</div>
				<div className='w-1/2'>
					{isLoading ? (
						<p className="text-sky-100 mt-6">Cargando datos del clima...</p>
					) : isChartReadyR ? (
						<div className="p-6">
							<LineCart
								title="Temperatura en Retalhuleu"
								labels={timeR}
								dataset={tempdataR}
							/>
						</div>
					) : (
						<p className="text-red-500 mt-6">No hay datos suficientes para mostrar el gráfico.</p>
					)}
				</div>
			</div>

			<div className='flex gap-6'>
				<div className='w-1/2'>
					{isLoading ? (
						<p className="text-sky-100 mt-6">Cargando datos del clima...</p>
					) : isChartReadyGT ? (
						<div className="p-6">
							<LineCart
								title="Porcentaje de humedad en Ciudad de Guatemala"
								labels={timeGT}
								dataset={humedadGT}
							/>
						</div>
					) : (
						<p className="text-red-500 mt-6">No hay datos suficientes para mostrar el gráfico.</p>
					)}
				</div>
				<div className='w-1/2'>
					{isLoading ? (
						<p className="text-sky-100 mt-6">Cargando datos del clima...</p>
					) : isChartReadyR ? (
						<div className="p-6">
							<LineCart
								title="Porcentaje de humedad en Retalhuleu"
								labels={timeR}
								dataset={humedadR}
							/>
						</div>
					) : (
						<p className="text-red-500 mt-6">No hay datos suficientes para mostrar el gráfico.</p>
					)}
				</div>
			</div>

			<div className='flex gap-6'>
				<div className='w-1/2'>
					<div className='p-6'>
						<BarChart data={allWeatherDataGT} />
					</div>
				</div>
				<div className='w-1/2'>
					<div className='p-6'>
						<BarChart data={allWeatherDataR} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
