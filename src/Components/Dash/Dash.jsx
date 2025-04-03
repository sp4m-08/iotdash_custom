import React, { useState, useEffect } from 'react';
import './Dash.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dash() {
  const [sensorData, setSensorData] = useState({
    temp: '--',
    humidity: '--',
    heart: '--',
    spo2: '--',
    bodytemp: '--'
  });

  // State to store historical data for charts
  const [history, setHistory] = useState({
    temp: [],
    humidity: [],
    heart: [],
    spo2: [],
    bodytemp: [],
    timestamps: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data');
        const data = await response.json();
        setSensorData(data);
        
        // Update history
        setHistory(prev => {
          const now = new Date();
          const timeStr = now.toLocaleTimeString();
          
          // Keep only the last 20 readings for better performance
          const newHistory = {
            temp: [...prev.temp.slice(-19), data.temp !== '--' ? data.temp : null],
            humidity: [...prev.humidity.slice(-19), data.humidity !== '--' ? data.humidity : null],
            heart: [...prev.heart.slice(-19), data.heart !== '--' ? data.heart : null],
            spo2: [...prev.spo2.slice(-19), data.spo2 !== '--' ? data.spo2 : null],
            bodytemp: [...prev.bodytemp.slice(-19), data.bodytemp !== '--' ? data.bodytemp : null],
            timestamps: [...prev.timestamps.slice(-19), timeStr]
          };
          return newHistory;
        });
      } catch (err) {
        console.error('Error fetching sensor data:', err);
      }
    };

    // Fetch data immediately and then every second
    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  // Chart configuration
  const createChartOptions = (title) => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: false
      }
    },
    animation: {
      duration: 0 // Disable animation for better real-time performance
    }
  });

  const createChartData = (label, data, color) => ({
    labels: history.timestamps,
    datasets: [
      {
        label: label,
        data: data,
        borderColor: color,
        backgroundColor: color + '40', // Add opacity
        tension: 0.1,
        pointRadius: 2
      }
    ]
  });

  return (
    <div className='dash-container'>
      <div className='dash-components'>
        {/* Temperature Card */}
        <div className='dash-item'>
          <p>Temperature</p>
          <p className="sensor-value">{sensorData.temp}°C</p>
          <img src="temp.png" alt="Body Temperature" />
          <div className="chart-container">
            <Line 
              options={createChartOptions('Temperature History')}
              data={createChartData('°C', history.temp, 'rgb(255, 99, 132)')}
            />
          </div>
        </div>

        {/* Humidity Card */}
        <div className='dash-item'>
          <p>Humidity</p>
          <p className="sensor-value">{sensorData.humidity}%</p>
          <img src="humidity.png" alt="Body Temperature" />
          <div className="chart-container">
            <Line 
              options={createChartOptions('Humidity History')}
              data={createChartData('%', history.humidity, 'rgb(54, 162, 235)')}
            />
          </div>
        </div>

        {/* Heart Rate Card */}
        <div className='dash-item'>
          <p>Heart Rate</p>
          <p className="sensor-value">{sensorData.heart} BPM</p>
          <img src="heart.png" alt="Body Temperature" />
          <div className="chart-container">
            <Line 
              options={createChartOptions('Heart Rate History')}
              data={createChartData('BPM', history.heart, 'rgb(255, 159, 64)')}
            />
          </div>
        </div>

        {/* SpO2 Card */}
        <div className='dash-item'>
          <p>SpO₂</p>
          <p className="sensor-value">{sensorData.spo2}%</p>
          <img src="spo2.png" alt="Body Temperature" />
          <div className="chart-container">
            <Line 
              options={createChartOptions('Blood Oxygen History')}
              data={createChartData('%', history.spo2, 'rgb(75, 192, 192)')}
            />
          </div>
        </div>

        {/* Body Temperature Card */}
        <div className='dash-item'>
          <p>Body Temperature</p>
          <p className="sensor-value">{sensorData.bodytemp}°C</p>
          <img src="body-temp.png" alt="Body Temperature" />
          <div className="chart-container">
            <Line 
              options={createChartOptions('Body Temp History')}
              data={createChartData('°C', history.bodytemp, 'rgb(153, 102, 255)')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;