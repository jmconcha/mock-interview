import React from 'react';

import List from './List';

function App() {
  const [text, setText] = React.useState<string>('');

  const handleChange = (e: any) => setText(e.target.value);

  return (
    <div>
      <input value={text} onChange={handleChange} />
      {text && <List keyword={text} />}
    </div>
  );
}

export default App;
