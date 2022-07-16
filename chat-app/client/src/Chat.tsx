import React, { useState, useEffect, useRef } from 'react';
import { connect } from './socket';

import Message, { MessageType } from './Message';

function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [toggleColorBlindMode, setToggleColorBlindMode] =
    useState<boolean>(false);
  const connectionRef = useRef<any>(null);
  const lastMessageElementRef = useRef<any>(null);

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

  useEffect(() => {
    if (messages.length > 0) {
      console.log('here', lastMessageElementRef.current);

      lastMessageElementRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [messages]);

  const handleClick = () => {
    setToggleColorBlindMode((prevState) => !prevState);
  };

  return (
    <div className="border-2 border-gray-500 p-4 mt-8 w-1/2 overflow-scroll">
      <button
        onClick={handleClick}
        className="mb-4 border-b-2 border-transparent hover:border-gray-500"
      >
        Toggle Color Blind Mode: {toggleColorBlindMode ? 'OFF' : 'ON'}
      </button>
      <hr />
      {messages.map((msg: MessageType, index: number) => {
        if (index === messages.length - 1) {
          return (
            <Message
              key={index}
              {...msg}
              colorBlindMode={toggleColorBlindMode}
              elRef={lastMessageElementRef}
            />
          );
        }

        return (
          <Message key={index} {...msg} colorBlindMode={toggleColorBlindMode} />
        );
      })}
    </div>
  );
}

export default Chat;
