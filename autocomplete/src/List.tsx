import React from 'react';

import words from './words';

import ListItem from './ListItem';

function List({ keyword }: { keyword: string }): JSX.Element {
  const wordList = React.useMemo(() => {
    const possibleWords = [];

    for (let i = 0; i < words.length; i++) {
      if (words[i].startsWith(keyword)) {
        possibleWords.push(words[i]);
      }
    }

    return possibleWords;
  }, [keyword]);

  return (
    <ol className="word-list">
      {wordList.map((word) => (
        <ListItem key={word} word={word} />
      ))}
    </ol>
  );
}

export default List;
