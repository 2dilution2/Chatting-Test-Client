import React, { useState, useEffect } from 'react';

function Chat() {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [roomIdInput, setRoomIdInput] = useState(''); 

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/chat');
      const data = await response.json();
      setChatRooms(data);
    } catch (error) {
      console.error("Failed to fetch chat rooms:", error);
    }
  };

  const createRoom = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/chat/${roomId}`, {
        method: 'POST'
      });
      if (response.ok) fetchChatRooms();
    } catch (error) {
      console.error("Failed to create chat room:", error);
    }
  };

  const joinRoom = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/chat/${roomId}/join`, {
        method: 'POST'
      });
      if (response.ok) setSelectedRoom(roomId);
    } catch (error) {
      console.error("Failed to join chat room:", error);
    }
  };

  const fetchMessages = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/chat/${roomId}/message`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error(`Failed to fetch messages for room ${roomId}:`, error);
    }
  };

  const sendMessage = async () => {
    if (!selectedRoom || !input) return;

    try {
      const response = await fetch(`http://localhost:8080/api/chat/${selectedRoom}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (response.ok) {
        setInput('');
        fetchMessages(selectedRoom);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleJoinById = () => {
    if (roomIdInput.trim()) {
      joinRoom(roomIdInput);
      setRoomIdInput(''); // Clear the input after joining
    }
  };

  return (
    <div>
      <div>
        <h2>Chat Rooms</h2>
        {chatRooms.map((room) => (
          <button key={room.id} onClick={() => joinRoom(room.id)}>
            {room.name}
          </button>
        ))}
        <div>
          <input
            placeholder="Enter Room ID"
            value={roomIdInput}
            onChange={e => setRoomIdInput(e.target.value)}
          />
          <button onClick={handleJoinById}>Join By Room ID</button>
        </div>      </div>
      {selectedRoom && (
        <div>
          <h2>Chat Room: {selectedRoom}</h2>
          {messages.map((message, index) => (
            <div key={index}>{message.content} - {message.sender}</div>
          ))}
          <input value={input} onChange={e => setInput(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default Chat;
