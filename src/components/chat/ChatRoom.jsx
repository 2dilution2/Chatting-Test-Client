import * as StompJs from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import ChatMessageItem from './ChatMessageItem';
import Input from '../Input';
import Button from '../Button';

const ColDiv = styled.div`
  padding: 4rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-100);
  border-radius: 10px;
  gap: 2rem;
`;

const Form = styled.form`
  padding: 2rem;
  margin-top: 2rem;
  display: flex;
  gap: 1.8rem;
  justify-content: space-around;
  background-color: white;
  border-radius: 10px;

  & input {
    width: 80%;
  }

  & button {
    width: 20%;
  }
`;

function ChatRoom() {
  const [text, setText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const client = useRef();

  const { id } = useParams();
  const queryClient = useQueryClient();
  const { nickname } = queryClient.getQueryData(['info']);

  const enter = () => {
    if (client.current && client.current.connected) {
      console.info('enter chatroom');
      client.current.publish({
        destination: `/pub/chat.enter.${id}`,
        body: JSON.stringify({
          type: 'ENTER',
          chatRoomId: id,
          sender: nickname,
          content: `채팅방 접속`,
        }),
      });
    }
  };

  const subscribe = () => {
    client.current.subscribe(`/exchange/chat.exchange/room.${id}`, ({ body }) => {
      setChatHistory((prevHistory) => [...prevHistory, JSON.parse(body)]);
    });
  };

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/ws/websocket',
      connectHeaders: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      onConnect: () => {
        console.info('stomp success');
        subscribe();
        enter();
      },
      debug: (str) => {
        console.info(str);
      },
      reconnectDelay: 5000,
    });
    client.current.activate();
  };

  const send = (message) => {
    if (client.current && client.current.connected) {
      console.info('try to send message');
      client.current.publish({
        destination: `/pub/chat.send.${id}`,
        body: JSON.stringify({
          type: 'TALK',
          chatRoomId: id,
          sender: nickname,
          content: message,
        }),
      });
      console.info('send success');
      setText('');
    }
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text) send(text);
  };

  return (
    <ColDiv>
      {chatHistory &&
        chatHistory.map((item) => <ChatMessageItem key={item.createdAt} item={item} />)}
      <Form onSubmit={onSubmit}>
        <Input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <Button color="info">보내기</Button>
      </Form>
    </ColDiv>
  );
}

export default ChatRoom;
