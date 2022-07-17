import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

import { connect } from './socket';
import Message, { MessageType } from './Message';

function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [toggleColorBlindMode, setToggleColorBlindMode] =
    useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const connectionRef = useRef<any>(null);
  const lastMessageElementRef = useRef<any>(null);

  useEffect(() => {
    let connection = connect();
    connectionRef.current = connection;

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
        scrollToLastMessage();
      });
    });

    return () => {
      connection.disconnect();
    };
  }, []);

  const handleClick = () => {
    setToggleColorBlindMode((prevState) => !prevState);
  };

  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const body = text.trim();

    if (body === '') return;

    const payload = {
      body,
      user: {
        name: 'John Doe',
        color: 'aqua',
      },
    };

    const connection = connectionRef.current;
    connection.emit('chat-message', payload);

    setText('');
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
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 mt-2 flex box-border p-2"
      >
        <input
          value={text}
          onChange={handleChange}
          className="w-full mr-4 focus:outline-gray-400 px-2"
        />
        <button className="py-2 px-4 font-bold text-white bg-blue-400 hover:bg-blue-500">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
