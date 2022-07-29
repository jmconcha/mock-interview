import React from 'react';

import List from './List';

function App() {
  const [text, setText] = React.useState<string>('');

  const handleChange = (e: any) => setText(e.target.value);

  const keyword = React.useMemo(() => {
    const trimmedText = text.trim();
    if (trimmedText === '') return '';

    const words = trimmedText.split(' ');
    return words[words.length - 1];
  }, [text]);

  return (
    <div>
      <input value={text} onChange={handleChange} />
      {keyword && <List keyword={keyword} />}
    </div>
  );
}

export default App;
