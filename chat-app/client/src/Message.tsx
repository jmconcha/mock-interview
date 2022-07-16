import React from 'react';

export interface MessageType {
  body: string;
  user: {
    name: string;
    color: string;
  };
}

function Message(props: MessageType): JSX.Element {
  const {
    body,
    user: { name, color },
  } = props;

  return (
    <div className="border-b-2 border-gray-400 mb-4">
      <span style={{ color }}>{name}</span>
      <p>{body}</p>
    </div>
  );
}

export default Message;
