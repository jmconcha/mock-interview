import React from 'react';

import words from './words';

import ListItem from './ListItem';

function List({ keyword }: { keyword: string }): JSX.Element | null {
  const wordList = React.useMemo(() => {
    const possibleWords = [];

    for (let i = 0; i < words.length; i++) {
      if (words[i].startsWith(keyword)) {
        possibleWords.push(words[i]);
      }
    }

    return possibleWords;
  }, [keyword]);

  let list;
  if (wordList.length === 1 && wordList[0].length === keyword.length) {
    list = null;
  } else {
    list = (
      <ol className="word-list">
        {wordList.map((word) => (
          <ListItem key={word} word={word} />
        ))}
      </ol>
    );
  }

  return list;
}

export default List;
