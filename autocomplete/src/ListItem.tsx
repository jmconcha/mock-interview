import React from 'react';

import InputContext from './InputContext';

function ListItem({ word }: { word: string }): JSX.Element {
  const { onChoosenWord } = React.useContext(InputContext);

  const handleClick = () => {
    if (onChoosenWord) {
      onChoosenWord(word);
    }
  };

  return <li onClick={handleClick}>{word}</li>;
}

export default ListItem;
