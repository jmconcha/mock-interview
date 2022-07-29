import React from 'react';

import InputContext from './InputContext';
import List from './List';

function App() {
  const [text, setText] = React.useState<string>('');
  const [suggest, setSuggest] = React.useState<boolean>(true);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: any) => {
    setText(e.target.value);
    setSuggest(true);
  };
  const handleChoosenWord = (str: string): void => {
    const words = text.split(' ');
    words[words.length - 1] = str;
    const newText = words.join(' ') + ' ';

    setText(newText);
    setSuggest(false);
    inputRef.current?.focus();
  };

  const keyword = React.useMemo(() => {
    const trimmedText = text.trim();
    if (trimmedText === '') return '';

    const words = trimmedText.split(' ');
    return words[words.length - 1];
  }, [text]);

  return (
    <InputContext.Provider value={{ onChoosenWord: handleChoosenWord }}>
      <div>
        <input ref={inputRef} value={text} onChange={handleChange} />
        {suggest && keyword && <List keyword={keyword} />}
      </div>
    </InputContext.Provider>
  );
}

export default App;
