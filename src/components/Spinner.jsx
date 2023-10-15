import styled from 'styled-components';
import spinner from '../assets/spinner.gif';

const Div = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 8rem;
    height: 8rem;
  }
`;

function Spinner() {
  return (
    <Div>
      <img src={spinner} alt="spinner" />
    </Div>
  );
}

export default Spinner;
