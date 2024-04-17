

import React, { useState, useEffect } from 'react';
import './App.css';
import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement } from 'chart.js';
Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement);


function TimelineChart() {
  const [data, setData] = useState([]);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/data');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const ctx = document.getElementById('myChart').getContext('2d');
      if (chart) {
        chart.destroy();
      }
      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map((item) => item.ts), 
          datasets: [{
            label: 'Machine Status',
            data: data.map((item) => item.machine_status), 
            backgroundColor: 'rgba(54, 162, 235, 0.2)', 
            borderColor: 'rgba(54, 162, 235, 1)', 
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            xAxes: [{
              type: 'category', 
              ticks: {
              },
            }],
            yAxes: [{
              ticks: {
              },
            }],
          },
          legend: {
            display: true, 
            position: 'bottom', 
          },
          tooltips: {
            enabled: true, 
          },
        },
      });
      setChart(newChart);
    }
  }, [data]);

  return (
    <div className="App">
      <h1>Machine Status</h1>
      <div className="chart-container">
        <canvas id="myChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
}

export default TimelineChart;
