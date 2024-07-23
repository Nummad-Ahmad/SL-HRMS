import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({male, female}) => {
  const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Total employees',
        data: [male, female],
        backgroundColor: ['blue', 'red'],
        borderColor: ['blue', 'red'],
        borderWidth: 1,
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

  return <Pie data={data} options={options} />;
};

export default PieChart;