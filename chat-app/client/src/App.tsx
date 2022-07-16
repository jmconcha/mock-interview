import React, { useEffect } from 'react';

import { io } from 'socket.io-client';

function App() {
  useEffect(() => {
    const socket = io('http://localhost:5000');
    console.log('connecting...');
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      socket.close();
    };
  }, []);

  return <div>App</div>;
}

export default App;
