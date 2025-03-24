import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data }) => {
  // Contar los tipos de clima
  const weatherCounts = {};

  data.forEach(item => {
    const type = item.weather;
    weatherCounts[type] = (weatherCounts[type] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(weatherCounts),
    datasets: [
      {
        label: 'Frecuencia de tipos de clima',
        data: Object.values(weatherCounts),
        backgroundColor: [
          '#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA', '#F472B6', '#2DD4BF', '#FCD34D'
        ],
        borderColor: '#1E293B',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-transparent rounded-3xl border-2 border-sky-200 shadow p-4 w-full">
      <h2 className="text-sky-100 text-xl font-bold mb-4">Tipos de clima predominantes</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
