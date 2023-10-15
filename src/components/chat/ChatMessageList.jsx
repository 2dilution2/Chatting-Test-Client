import styled from 'styled-components';
import ChatMessageItem from './ChatMessageItem';

const RowDiv = styled.div`
  flex-direction: column;
  gap: 1.6rem;
`;

function ChatMessageList() {
  return (
    <RowDiv>
      <ChatMessageItem />
    </RowDiv>
  );
}

export default ChatMessageList;
