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

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

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

// 🔐 Firebase config (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBgmeTbKwQIqLcfoKqdw6q8AoSRWyKBy0U",
  authDomain: "health-98bc9.firebaseapp.com",
  databaseURL: "https://health-98bc9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "health-98bc9",
  storageBucket: "health-98bc9.firebasestorage.app",
  messagingSenderId: "26199772449",
  appId: "1:26199772449:web:c64420b9cc4bca85c58260",
  measurementId: "G-2P0PLY2WT1"
};

// 🧠 Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function DashFire() {
  const [sensorData, setSensorData] = useState({
    temp: '--',
    humidity: '--',
    heart: '--',
    spo2: '--',
    bodytemp: '--'
  });

  const [history, setHistory] = useState({
    temp: [],
    humidity: [],
    heart: [],
    spo2: [],
    bodytemp: [],
    timestamps: []
  });

  useEffect(() => {
    const healthRef = ref(database, '/');
    
    const unsubscribe = onValue(healthRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const newSensorData = {
          temp: data.environment?.temperature ?? '--',
          humidity: data.environment?.humidity ?? '--',
          heart: data.health?.heart_rate ?? '--',
          spo2: data.health?.spo2 ?? '--',
          bodytemp: data.health?.body_temperature ?? '--'
        };

        setSensorData(newSensorData);

        const now = new Date();
        const timeStr = now.toLocaleTimeString();

        setHistory(prev => ({
          temp: [...prev.temp.slice(-9), newSensorData.temp],
          humidity: [...prev.humidity.slice(-9), newSensorData.humidity],
          heart: [...prev.heart.slice(-9), newSensorData.heart],
          spo2: [...prev.spo2.slice(-9), newSensorData.spo2],
          bodytemp: [...prev.bodytemp.slice(-9), newSensorData.bodytemp],
          timestamps: [...prev.timestamps.slice(-9), timeStr]
        }));
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  const createChartOptions = (title) => ({
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: title },
    },
    scales: { y: { beginAtZero: false } },
    animation: { duration: 0 }
  });

  const createChartData = (label, data, color) => ({
    labels: history.timestamps,
    datasets: [
      {
        label: label,
        data: data,
        borderColor: color,
        backgroundColor: color + '40',
        tension: 0.1,
        pointRadius: 2
      }
    ]
  });

  return (
    <div className='dash-container'>
      <div className='dash-components'>
        {/* Repeat this card structure for each sensor */}
        <div className='dash-item'>
          <p>Temperature</p>
          <p className="sensor-value">{sensorData.temp}°C</p>
          <img src="temp.png" alt="Temperature" />
          <div className="chart-container">
            <Line 
              options={createChartOptions('Temperature History')}
              data={createChartData('°C', history.temp, 'rgb(255, 99, 132)')}
            />
          </div>
        </div>

        <div className='dash-item'>
          <p>Humidity</p>
          <p className="sensor-value">{sensorData.humidity}%</p>
          <img src="humidity.png" alt="Humidity" />
          <div className="chart-container">
            <Line 
              options={createChartOptions('Humidity History')}
              data={createChartData('%', history.humidity, 'rgb(54, 162, 235)')}
            />
          </div>
        </div>

        <div className='dash-item'>
          <p>Heart Rate</p>
          <p className="sensor-value">{sensorData.heart} BPM</p>
          <img src="heart.png" alt="Heart" />
          <div className="chart-container">
            <Line 
              options={createChartOptions('Heart Rate History')}
              data={createChartData('BPM', history.heart, 'rgb(255, 159, 64)')}
            />
          </div>
        </div>

        <div className='dash-item'>
          <p>SpO₂</p>
          <p className="sensor-value">{sensorData.spo2}%</p>
          <img src="spo2.png" alt="SpO2" />
          <div className="chart-container">
            <Line 
              options={createChartOptions('Blood Oxygen History')}
              data={createChartData('%', history.spo2, 'rgb(75, 192, 192)')}
            />
          </div>
        </div>

        <div className='dash-item'>
          <p>Body Temperature</p>
          <p className="sensor-value">{sensorData.bodytemp}°C</p>
          <img src="body-temp.png" alt="Body Temp" />
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

export default DashFire;
