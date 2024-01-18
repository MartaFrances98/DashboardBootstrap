import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios'; 
import 'moment';
import 'chartjs-adapter-moment';
import Chart from 'chart.js/auto';

function MyLineChart2({ anio }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Número de Citas por Día',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/citasPorDiaEnero/${anio}`)
      .then(response => {
        const dataPoints = response.data.map(item => item.cantidadCitas);
        // Asegúrate de que las fechas estén en el formato correcto
        const labels = response.data.map(item => item.dia); // Formato de fecha (ejemplo: '1', '2', '3', ..., '31')

        setChartData({
          labels: labels,
          datasets: [{
            label: 'Número de Citas por Día',
            data: dataPoints,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        });
      })
      .catch(error => {
        console.error("Error al obtener los datos: ", error);
      });
  }, [anio]);

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          // Si tus etiquetas son solo números de día, necesitarás proporcionar un año y mes para el parser
          parser: 'YYYY-MM-DD',
          // Asegúrate de que el formato de tooltip sea un formato de fecha válido
          tooltipFormat: 'll'
        },
        title: {
          display: true,
          text: 'Día'
        },
        ticks: {
          // Asegúrate de que las etiquetas no se superpongan y sean legibles
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de Citas'
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
}

export default MyLineChart2;
