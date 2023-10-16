import { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import CreateCrew from '../components/chat/CreateChatRoom';
import CrewList from '../components/chat/ChatRoomList';

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
        <Button color="info" onClick={() => setOpen(prev => !prev)}>
          채팅방 만들기
        </Button>
      </div>
      {open && <CreateCrew />}
      <CrewList />
    </Main>
  );
}

export default Home;
