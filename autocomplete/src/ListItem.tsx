import React from 'react';

function ListItem({ word }: { word: string }): JSX.Element {
  return <li>{word}</li>;
}

export default ListItem;
