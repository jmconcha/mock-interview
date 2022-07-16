import React, { useEffect, useRef } from 'react';
import { connect } from './socket';

function Chat() {
  const connectionRef = useRef<any>(null);

  useEffect(() => {
    connectionRef.current = connect();

    return () => {
      connectionRef.current.disconnect();
    };
  }, []);

  return <div>Chat</div>;
}

export default Chat;
