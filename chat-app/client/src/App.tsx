import React, { useState } from 'react';

import Chat from './Chat';

function App() {
  const [join, setJoin] = useState<boolean>(false);

  const handleClick = (e: any) => {
    if (e.target.textContent === 'Join') {
      setJoin(true);
    } else {
      setJoin(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gray-100 p-2">
      <h1 className="text-blue-500 text-2xl">Chat App</h1>
      <button
        className="border-2 px-2 mt-4 border-green-500"
        onClick={handleClick}
      >
        {join ? 'Leave' : 'Join'}
      </button>
      {join && <Chat />}
    </div>
  );
}

export default App;
