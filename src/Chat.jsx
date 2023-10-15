import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';

function Crew() {
  const [client, setClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { crewId } = useParams(); 

  useEffect(() => {
    const socket = new SockJS('http://localhost:5173/ws');
    const stompClient = Client.over(socket);

    stompClient.connect({}, () => {
      setConnected(true);

      // 메시지 구독
      stompClient.subscribe(`/topic/crew.chat/${crewId}`, message => {
        const receivedMessage = JSON.parse(message.body);
        setMessages(prev => [...prev, receivedMessage]);
      });

    }, error => {
      console.error("Error while connecting:", error);
      setConnected(false);
    });

    setClient(stompClient);

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
    }
  }, [crewId]);

  const handleSendMessage = () => {
    if (client && newMessage.trim() !== '') {
      const chatMessage = {
        content: newMessage
      };
      client.send(`/pub/crew.chat/${crewId}`, {}, JSON.stringify(chatMessage));
      setNewMessage('');
    }
  };

  return (
    <div>
      <h3>{connected ? "Connected to the WebSocket" : "Not connected"}</h3>
      <ul>
        {messages.map((message, idx) => <li key={idx}>{message.content}</li>)}
      </ul>
      <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default Crew;
