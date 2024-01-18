import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Chart from 'chart.js/auto';

function MyBarChart({ anio }) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Número de Citas por Mes',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            borderWidth: 1
        }]
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/citasPorMes2024`)
            .then(response => {
                const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                const citas = new Array(12).fill(0); // Inicializa un array para los 12 meses con 0

                // Procesa los datos para colocarlos en el mes correcto
                response.data.forEach(cita => {
                    if (cita.mes > 0 && cita.mes <= 12) {
                        citas[cita.mes - 1] = cita.cantidadCitas;
                    }
                });

                setChartData({
                    labels: meses,
                    datasets: [{
                        label: 'Número de Citas por Mes',
                        data: citas,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 1
                    }]
                });
            })
            .catch(error => console.error('Error:', error));
    }, [anio]); // Dependencias en el useEffect

    return (
            <Bar data={chartData} options={{
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }} />
    );
}

export default MyBarChart;
