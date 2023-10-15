import styled from 'styled-components';
import ChatRoomItem from './ChatRoomItem';
import { useQueryChatRoomList } from '../../hooks/chat';

const Ul = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

function ChatRoomList() {
  const { chatRoomList, status } = useQueryChatRoomList();

  if (status === 'loading') {
    return <h2>Loading...</h2>;
  }

  return (
    <Ul>
      {chatRoomList.length === 0 && <h2>채팅방을 만들어보세요!</h2>}
      {chatRoomList &&
        chatRoomList.map((room) => <ChatRoomItem key={room.chatRoomId} room={room} />)}
    </Ul>
  );
}

export default ChatRoomList;
