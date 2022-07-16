import React, { useEffect } from 'react';

import { io } from 'socket.io-client';

function App() {
  useEffect(() => {
    const socket = io('http://localhost:5000');

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>App</div>;
}

export default App;
