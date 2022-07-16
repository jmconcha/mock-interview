import React from 'react';

export interface MessageType {
  body: string;
  user: {
    name: string;
    color: string;
  };
}

interface MessageProps extends MessageType {
  colorBlindMode: boolean;
}

function Message(props: MessageProps): JSX.Element {
  const {
    body,
    user: { name, color },
    colorBlindMode,
  } = props;

  const style = {
    color: colorBlindMode ? 'black' : color,
    fontWeight: 'bold',
  };

  return (
    <div className="border-b-2 border-gray-400 mb-4">
      <span style={style}>{name}</span>
      <p>{body}</p>
    </div>
  );
}

export default Message;
