import React, { useState, useEffect, useRef } from 'react';
import { connect } from './socket';

import Message, { MessageType } from './Message';

function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const connectionRef = useRef<any>(null);

  useEffect(() => {
    let connection = connectionRef.current;
    connection = connect();

    connection.on('initial-messages', (msgs: MessageType[]) => {
      console.log('msgs', msgs);
      setMessages(msgs);
    });
    connection.on('chat-message', (msg: MessageType) => {
      setMessages((m: MessageType[]) => [...m, msg]);
    });

    return () => {
      connection.disconnect();
    };
  }, []);

  console.log('here', messages);
  return (
    <div className="border-2 border-gray-500 p-4 mt-8 w-1/2 overflow-scroll">
      {messages.map((msg: MessageType, index: number) => (
        <Message key={index} {...msg} />
      ))}
    </div>
  );
}

export default Chat;
