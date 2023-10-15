import styled from 'styled-components';
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const Li = styled.li`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  border: 2px solid var(--color-grey-800);
  border-radius: 10px;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

function ChatRoomItem({ room }) {
  return (
    <Link to={`/chat/${room.chatRoomId}`}>
      <Li>
        <h2>{room.title}</h2>
        <p>{room.desc}</p>
        <Span>
          <HiOutlineChatBubbleOvalLeft />
          현재 인원 : {room.chatRoomMemberCnt} / {room.maxParticipant}
        </Span>
      </Li>
    </Link>
  );
}

export default ChatRoomItem;
