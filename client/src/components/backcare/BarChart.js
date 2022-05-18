import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    }
  },
};

const labels = ['January', 'February', 'March', 'April', 'May'];

const BarChart = () => {

  const [data, setData] = useState({ datasets: [] });

  useEffect(() => {

    axios.get('/api/datalab/backcare/data')
      .then(result => setData({
        labels,
        datasets: [
          {
            label: 'Good posture',
            data: labels.map(label => Number(result.data.find(data => data.month.trim() === label).good)),
            backgroundColor: '#B8F1B0',
          },
          {
            label: 'Bad posture',
            data: labels.map(label => Number(result.data.find(data => data.month.trim() === label).bad)),
            backgroundColor: '#EB5353',
          },
        ],
      }))
      .catch(e => console.error(e));

  }, []);

  return (
    <Bar options={ options } data={ data } />
  );
};

export default BarChart;