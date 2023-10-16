import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CrewRoom from '../components/chat/ChatRoom';

const Div = styled.div``;

function Chat() {
  const { id } = useParams();

  return (
    <Div>
      <h1>채팅방 #{id}</h1>
      <CrewRoom />
    </Div>
  );
}

export default Chat;
