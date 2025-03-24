import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineCart = ({ title, labels = [], dataset = [] }) => {
  if (!Array.isArray(labels) || !Array.isArray(dataset)) {
    return <p className="text-red-500">Esperando datos para el gráfico...</p>;
  }

  const data = {
    labels,
    datasets: dataset
  };

  const options = {
	responsive: true,
	plugins: {
	  legend: {
		position: 'top',
		labels: {
		  color: '#e2e8f0' // texto claro
		}
	  },
	  tooltip: {
		enabled: true
	  },
	  title: {
		display: false
	  }
	},
	scales: {
	  x: {
		ticks: {
		  color: '#e2e8f0', // texto eje X
		  display: false
		},
		grid: {
		  color: 'rgba(255,255,255,0.1)'
		}
	  },
	  y: {
		ticks: {
		  color: '#e2e8f0', // texto eje Y
		},
		grid: {
		  color: 'rgba(255,255,255,0.1)'
		}
	  }
	}
  };
  

  return (
    <div className="bg-transparent rounded-3xl border-2 border-sky-200 shadow p-4 w-full h-full">
      <h2 className="text-sky-100 text-xl font-bold mb-4">{title}</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineCart;