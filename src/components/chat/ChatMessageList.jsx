import styled from 'styled-components';
import CrewMessageItem from './ChatMessageItem';

const RowDiv = styled.div`
  flex-direction: column;
  gap: 1.6rem;
`;

function CrewMessageList() {
  return (
    <RowDiv>
      <CrewMessageItem />
    </RowDiv>
  );
}

export default CrewMessageList;
