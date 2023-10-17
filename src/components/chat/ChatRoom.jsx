import * as StompJs from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { useEffect, useRef, useState, useCallback } from 'react';
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

  const queryClient = useQueryClient();
  const info = queryClient.getQueryData(['info']);

  const { id } = useParams();

  const enter = useCallback(async () => {
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
  }, [id]);
  
  const subscribe = useCallback(() => {
    client.current.subscribe(`/exchange/chat.exchange/crew.${id}`, ({ body }) => {
      setCrewHistory((prevHistory) => [...prevHistory, JSON.parse(body)]);
    });
  }, [id]);

  const connect = useCallback(() => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/ws/websocket',
      connectHeaders: { 
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'RefreshToken': localStorage.getItem('refreshToken')
      },      
      onConnect: () => {
        console.info('stomp success');
        subscribe(); // 이 위치로 옮김
        enter();
      },
      onStompError: (error) => {
        console.error('STOMP error:', error);
      },
      debug: (str) => {
        console.info(str);
      },
      reconnectDelay: 5000,
    });
    client.current.activate();
  }, [subscribe, enter]);

  const send = useCallback((message) => {
    if (client.current && client.current.connected) {
      console.info('try to send message');
      client.current.publish({
        destination: `/pub/crew.chat.${id}`,
        body: JSON.stringify({
          type: 'TALK',
          crewId: id,
          sender: info.nickname,
          content: message,
        }),
      });
      console.info('send success');
      setText('');
    }
  }, [id, info.nickname]);

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

  const fetchChatHistory = useCallback(async () => {
    try {
      const response = await fetch(`/api/crew/${id}/chat`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
  
      if (!response.ok) {
        const text = await response.text();
        console.log('Failed response:', text);
        return;
      }
    
      const data = await response.json();
      setCrewHistory(data);
    } catch (error) {
      console.error('Error while fetching chat history:', error);
    }
  }, [id]);
  
  const [hasFetchedHistory, setHasFetchedHistory] = useState(false);

  // 첫 번째 useEffect
  useEffect(() => {
      fetchChatHistory();
      setHasFetchedHistory(true);
  }, []);
  
  // 두 번째 useEffect
  useEffect(() => {
      if (hasFetchedHistory) {
          connect();
      }
  }, [hasFetchedHistory]);
  

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
