import * as StompJs from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import CrewMessageItem from './ChatMessageItem';
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

function CrewRoom() {
  const [text, setText] = useState('');
  const [crewHistory, setCrewHistory] = useState([]);
  const client = useRef();

  const { id } = useParams();
  const queryClient = useQueryClient();
  const { nickname } = queryClient.getQueryData(['info']);

  const enter = async () => {
    try {
      const response = await fetch(`/api/crew/${id}/chat`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.info(data); // "채팅방에 참여하였습니다."
      } else {
        console.error('Failed to enter the chat room:', data);
      }
    } catch (error) {
      console.error('Error while entering the chat room:', error);
    }
  };
  
  const subscribe = () => {
    client.current.subscribe(`/exchange/chat.exchange/crew.${id}`, ({ body }) => {
      setCrewHistory((prevHistory) => [...prevHistory, JSON.parse(body)]);
    });
  };

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/ws',
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
        destination: `/pub/crew.chat.${id}`,
        body: JSON.stringify({
          type: 'TALK',
          crewId: id,
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
    fetchChatHistory();
    connect();
    return () => disconnect();
  }, []);
  

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) send(text);
  };

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(`/api/crew/${id}/chat`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setCrewHistory(data);
      } else {
        console.error('Failed to fetch chat history:', data);
      }
    } catch (error) {
      console.error('Error while fetching chat history:', error);
    }
  };
  

  return (
    <ColDiv>
      {crewHistory &&
        crewHistory.map((item, index) => 
          <CrewMessageItem key={index} item={item} />
        )}
      <Form onSubmit={onSubmit}>
        <Input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="메시지를 입력하세요..."
        />
        <Button color="info">보내기</Button>
      </Form>
    </ColDiv>
  );
}

export default CrewRoom;
