import React, { useEffect, useState, useContext } from 'react';
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
import AuthContext from '../store/auth-context';
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
  const authCtx = useContext(AuthContext);

  useEffect(() => {

    axios.get('/api/datalab/backcare/data', { headers: { authorization: "Bearer " + authCtx.token } })
      .then(result => setData({
        labels,
        datasets: [
          {
            label: 'Good posture',
            data: labels.map(label => Number(result.data.find(data => data.month.trim() === label).good)),
            backgroundColor: '#9fd1bb',
          },
          {
            label: 'Bad posture',
            data: labels.map(label => Number(result.data.find(data => data.month.trim() === label).bad)),
            backgroundColor: '#e290ade1',
          },
        ],
      }))
      .catch(e => console.error(e));

  }, [authCtx.token]);

  return (
    <Bar options={ options } data={ data } />
  );
};

export default BarChart;