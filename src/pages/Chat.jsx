import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ChatRoom from '../components/chat/ChatRoom';

const Div = styled.div``;

function Chat() {
  const { id } = useParams();

  return (
    <Div>
      <h1>채팅방 #{id}</h1>
      <ChatRoom />
    </Div>
  );
}

export default Chat;
