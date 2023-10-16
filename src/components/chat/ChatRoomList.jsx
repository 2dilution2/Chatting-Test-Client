import React from 'react';
import styled from 'styled-components';
import CrewItem from './ChatRoomItem';
import { useQueryCrewList } from '../../hooks/chat';

const Ul = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

function CrewList() {
  const { crewList, status } = useQueryCrewList();

  if (status === 'loading') return <h2>Loading...</h2>;

  return (
    <>
      <Ul>
        {crewList.length === 0 && <h2>채팅방을 만들어보세요!</h2>}
        {crewList && crewList.map((crewRoom) => <CrewItem key={crewRoom.crewId} crewRoom={crewRoom} />)}
      </Ul>
    </>
  );
}

export default CrewList;
