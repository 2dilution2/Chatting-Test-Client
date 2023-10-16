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

function CrewItem({ crewRoom }) {
  return (
    <Link to={`/crew/${crewRoom.crewId}/chat`}> 
      <Li>
        <h2>{crewRoom.title}</h2>
        <p>{crewRoom.crewContent}</p>
        <Span>
          <HiOutlineChatBubbleOvalLeft />
          현재 인원 : {crewRoom.crewMemberCnt} / {crewRoom.maxCrew}
        </Span>
      </Li>
    </Link>
  );
}


export default CrewItem;
