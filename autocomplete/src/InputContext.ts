import React from 'react';

interface InputContextProps {
  text: string;
  setText: Function;
  handleChoosenWord: Function;
}

const InputContext = React.createContext<InputContextProps | null>(null);

export default InputContext;
