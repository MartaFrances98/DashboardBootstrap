import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function MyRadarChart() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        axios.get('http://localhost:5000/citasespecialidad')
            .then(response => {
                if (response.data && response.data.length > 0) {
                    const citas = response.data;
                    console.log(citas); 
                    const labels = citas.map(cita => cita.Especialidad);
                    const data1 = citas.map(cita => cita.Citas); // Asumiendo que esto es para el primer dataset
                    const data2 = citas.map(cita => cita.Citas); // Asumiendo que esto es para el segundo dataset, modifícalo según tus necesidades

                    setChartData({
                        labels: labels,
                        datasets: [{
                            label: 'My First Dataset',
                            data: data1,
                            fill: true,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            pointBackgroundColor: 'rgb(255, 99, 132)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(255, 99, 132)'
                        }, {
                            label: 'My Second Dataset',
                            data: data2,
                            fill: true,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgb(54, 162, 235)',
                            pointBackgroundColor: 'rgb(54, 162, 235)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(54, 162, 235)'
                        }]
                    });
                } else {
                    console.error('No se recibieron datos');
                }
            })
            .catch(error => {
                console.error('Error al obtener los datos: ', error);
                // Aquí puedes manejar el error, como mostrar un mensaje en la interfaz de usuario
            });
    }, []);

    return (
        <div>
            <Radar data={chartData} />
        </div>
    );
}

export default MyRadarChart;