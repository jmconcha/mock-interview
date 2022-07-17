import React from 'react';
import LolPng from './images/lol.png';

export interface MessageType {
  body: string;
  user: {
    name: string;
    color: string;
  };
}

interface MessageProps extends MessageType {
  colorBlindMode: boolean;
  elRef?: any;
}

function replaceLolWordWithEmoji(text: string) {
  const words = text.split(' ');
  const output = words.map((word: string, index: number) => {
    if (word.toLowerCase() === 'lol') {
      return (
        <img
          style={{ width: '1.5rem', height: '1.5rem', display: 'inline-block' }}
          src={LolPng}
          alt="LOL emoji"
        />
      );
    }
    return index === words.length - 1 ? word : word + ' ';
  });

  return output;
}

function Message(props: MessageProps): JSX.Element {
  const {
    body,
    user: { name, color },
    colorBlindMode,
    elRef,
  } = props;

  const style = {
    color: colorBlindMode ? 'black' : color,
    fontWeight: 'bold',
  };

  const words = replaceLolWordWithEmoji(body);

  return (
    <div className="border-b-2 border-gray-400 mb-4" ref={elRef}>
      <span style={style}>{name}</span>
      <p>{words}</p>
    </div>
  );
}

export default Message;
