import React, { useState, useEffect } from 'react';
import { AreaChart, Line, XAxis, Legend, LineChart, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Graphrg from './Graphrg';
import Plotly from 'plotly.js-dist-min';

export default function Contwo(props) {
  // Define state for data array
  const [data, setData] = useState([{}]);
  const [displaydata, setDisplaydata] = useState([]);

  useEffect(() => {
    var layout = {
      autosize: true,
      scene: {
        aspectmode: "auto",
        aspectratio: {
          x: 1, y: 1, z: 1,
        },
      },
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
      },
      paper_bgcolor: '#172144',
      plot_bgcolor: '#ffffff',
      font: {
        color: '#ffffff'
      },
      xaxis: {
        tickfont: {
          color: '#ffffff'
        }
      },
      yaxis: {
        tickfont: {
          color: '#ffffff'
        }
      },
      legend: {
        font: {
          color: '#ffffff'
        }
      },
      title: {
        font: {
          color: '#ffffff'
        }
      }
    };

    Plotly.newPlot('chart', [{
      z: displaydata,
      type: 'surface',
      colorscale: 'Jet',
    }], layout, { displayModeBar: false });
  }, [displaydata]);

  useEffect(() => {
    try {
      const { humidity, temperature, fahrenheit, latitude, longitude, Distance } = props.props;
      if (!isNaN(latitude) && !isNaN(longitude) && !isNaN(Distance)) {
        const newData = [latitude, longitude, Distance];
        // Add new data
        setDisplaydata(prevData => {
          // Remove 10 oldest elements if array length exceeds 50
          if (prevData.length >= 50) {
            return [...prevData.slice(50), newData];
          } else {
            return [...prevData, newData];
          }
        });
      } else {
        console.error('Invalid data detected:', { latitude, longitude, Distance });
      }
  
      setData(prevData => [
        ...prevData,
        { humidity, temperature, fahrenheit }
      ]);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }, [props.props]);
  

  return (
    <div className='h-full space-y-3'>
      <div className='h-1/2 p-3 text-white bg-[#172144] rounded-[10px]'>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            stroke="#FFFFFF"
            fill="#FFFFFF"
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="0 2" />
            <XAxis dataKey="name" />
            <YAxis tick={{ fill: 'white' }} tickLine={{ stroke: 'gray' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="humidity" stroke="#8884d8" />
            <Line type="monotone" dataKey="fahrenheit" stroke="#82ca9d" />
            <Line type="monotone" dataKey="temperature" stroke="#FF0000" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className='lg:h-1/2 p-2 bg-[#172144] rounded-[10px]'>
        <div className=''>
          <div id="chart" />
        </div>
      </div>
    </div>
  )
}
