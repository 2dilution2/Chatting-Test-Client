import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';

const Div = styled.div`
  display: flex;
  gap: 1.2rem;
`;

function SendChatMessage() {
  return (
    <Div>
      <Input />
      <Button color="info">보내기</Button>
    </Div>
  );
}

export default SendChatMessage;
