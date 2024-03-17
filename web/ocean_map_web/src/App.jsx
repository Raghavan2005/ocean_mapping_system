import React, { useState, useEffect } from 'react';
import './App.css';
import Conone from './Pages/Conone';
import Contwo from './Pages/Contwo';
import Header from './Pages/Header';
import Status from './Pages/Status';

// Establish WebSocket connection outside of the component
const ws = new WebSocket('ws://localhost:1234/webclient');

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    console.log('Connected to WebSocket server');

    // Handle incoming messages
    const handleIncomingMessage = (event) => {
      const jsonData = JSON.parse(event.data);
      setData(jsonData);
    };

    ws.onmessage = handleIncomingMessage;

    // Clean up function
    return () => {
      ws.onmessage = null; // Remove the event listener to prevent memory leaks
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className='text-white lg:m-3 sm:m-1 lg:hidesm'>
      <div className='lg:flex space-x-5'>
        <div className='lg:w-1/2'>
          <Conone props={data} web={ws} />
        </div>
        <div className='lg:w-1/2'>
          <Contwo props={data} />
        </div>
      </div>
      <Header props={data} />
    </div>
  );
}

export default App;
