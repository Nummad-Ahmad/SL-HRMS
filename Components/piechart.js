import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({male, female}) => {
  const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Total',
        data: [male, female],
        backgroundColor: ['rgb(9, 184, 210)', 'rgba(0, 79, 206, 0.75)'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default PieChart;