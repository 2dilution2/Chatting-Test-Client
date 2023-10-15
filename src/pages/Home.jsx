import { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import CreateChatRoom from '../components/chat/CreateChatRoom';
import ChatRoomList from '../components/chat/ChatRoomList';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3.2rem;
`;

function Home() {
  const [open, setOpen] = useState(false);

  return (
    <Main>
      <div>
        <Button color="info" onClick={() => setOpen((is) => !is)}>
          채팅방
        </Button>
      </div>
      {open && <CreateChatRoom />}
      <ChatRoomList />
    </Main>
  );
}

export default Home;
