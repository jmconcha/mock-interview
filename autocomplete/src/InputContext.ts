import React from 'react';

interface InputContextProps {
  text?: string;
  setText?: Function;
  onChoosenWord?: Function;
}

const InputContext = React.createContext<InputContextProps>({});

export default InputContext;
