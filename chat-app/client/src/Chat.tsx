import React, { useState, useEffect, useRef } from 'react';
import { connect } from './socket';

import Message, { MessageType } from './Message';
import { flushSync } from 'react-dom';

function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [toggleColorBlindMode, setToggleColorBlindMode] =
    useState<boolean>(false);
  const connectionRef = useRef<any>(null);
  const lastMessageElementRef = useRef<any>(null);

  useEffect(() => {
    let connection = connectionRef.current;
    connection = connect();

    const scrollToLastMessage = () => {
      lastMessageElementRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    };

    connection.on('initial-messages', (msgs: MessageType[]) => {
      console.log('msgs', msgs);
      setMessages(msgs);
    });

    connection.on('chat-message', (msg: MessageType) => {
      flushSync(() => {
        setMessages((m: MessageType[]) => [...m, msg]);
        // scrollToLastMessage();
      });
    });

    return () => {
      connection.disconnect();
    };
  }, []);

  const handleClick = () => {
    setToggleColorBlindMode((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col w-1/2 border-2 border-gray-500 mt-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 p-4">
        <button
          onClick={handleClick}
          className="border-b-2 border-transparent hover:border-gray-500"
        >
          Toggle Color Blind Mode: {toggleColorBlindMode ? 'OFF' : 'ON'}
        </button>
      </div>
      <div className="mt-14 overflow-y-auto p-4">
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
            <Message
              key={index}
              {...msg}
              colorBlindMode={toggleColorBlindMode}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Chat;
