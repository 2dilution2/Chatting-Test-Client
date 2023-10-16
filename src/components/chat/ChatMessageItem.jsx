import styled from 'styled-components';

const Div = styled.div`
  padding: 2rem;
  border: 2px solid var(--color-grey-800);
  border-radius: 10px;
  background-color: ${(props) => (props.color ? props.color : 'white')};
  display: flex;
  gap: 1.8rem;
  align-items: center;
`;

const Span = styled.span`
  font-weight: 600;
  color: var(--color-blue-700);
`;

const P = styled.p`
  text-align: center;
`;

function CrewMessageItem({ item }) {
  if (item.type === 'ENTER') {
    return <P>{item.content}</P>;
  }

  return (
    <Div>
      <Span>{item.nickname}</Span>
      <p>{item.content}</p>
    </Div>
  );
}

export default CrewMessageItem;
