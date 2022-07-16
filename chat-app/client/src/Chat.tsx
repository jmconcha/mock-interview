import React, { useState, useEffect, useRef } from 'react';
import { connect } from './socket';

import Message, { MessageType } from './Message';

function Chat() {
  const [messages, setMessages] = useState<any>([]);
  const connectionRef = useRef<any>(null);

  useEffect(() => {
    let connection = connectionRef.current;
    connection = connect();

    connection.on('chat-message', (msg: any) => {
      setMessages(msg);
    });

    return () => {
      connection.disconnect();
    };
  }, []);

  return (
    <div className="border-2 border-gray-500 p-4 mt-8 w-1/2 overflow-scroll">
      {messages.map((msg: MessageType, index: number) => (
        <Message key={index} {...msg} />
      ))}
    </div>
  );
}

export default Chat;
