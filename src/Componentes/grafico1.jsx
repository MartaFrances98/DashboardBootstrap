import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function MyLineChart() {
  // Estado para los datos del gráfico
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Número de Recetas por Tipo de Medicamento',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  });

  useEffect(() => {
    // Llamada al endpoint para obtener los datos
    fetch('http://localhost:5000/recetasmedicamento')
      .then(response => response.json())
      .then(data => {
        // Extraemos los datos para el gráfico
        const labels = data.map(d => d.Medicamento);
        const dataPoints = data.map(d => d.NumeroDeRecetas);

        // Actualizamos el estado del gráfico
        setChartData({
          labels: labels,
          datasets: [{
            label: 'Número de Recetas por Tipo de Medicamento',
            data: dataPoints,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        });
      })
      .catch(error => console.error('Error:', error));
  }, []); // El arreglo vacío asegura que useEffect se ejecute solo una vez

  return <Line data={chartData} />;
}

export default MyLineChart;
