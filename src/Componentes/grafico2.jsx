import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function MyDoughnutChart() {
  // Estado inicial con una estructura que incluye un array datasets vacío
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const fetchData = () => {
    fetch('http://localhost:5000/citasespecialidad')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('Datos recibidos:', data); // Verificar la respuesta del endpoint
        if (Array.isArray(data)) {
          const labels = data.map(item => item.Especialidad);
          const dataCounts = data.map(item => item.Citas);

          setChartData({
            labels: labels,
            datasets: [{
              label: 'Número de Citas por Especialidad',
              data: dataCounts,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(199, 199, 199, 0.2)' // Añade más colores si hay más fechas
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(159, 159, 159, 1)' // Añade más colores de borde si hay más fechas
              ],
              borderWidth: 1
            }]
          });
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Doughnut data={chartData} />
    </div>
  );
}

export default MyDoughnutChart;

            
              