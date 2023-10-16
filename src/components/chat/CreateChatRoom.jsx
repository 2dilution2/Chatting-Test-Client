import { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Input from '../Input';
import { useMutationCreate } from '../../hooks/chat';

const Wrapper = styled.div`
  width: 100%;
  padding: 2rem 4rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function CreateCrew() {
   // 기존 상태 값
   const [title, setTitle] = useState('');
   const [maxCrew, setMaxCrew] = useState(2);
   const [crewContent, setCrewContent] = useState('');

  const { createCrew, createStatus } = useMutationCreate();

  const onSubmit = (e) => {
    e.preventDefault();
    createCrew({ title, maxCrew, crewContent });
  };

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <ColDiv>
          <label htmlFor="title">제목</label>
          <Input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </ColDiv>

        <ColDiv>
          <label htmlFor="maxCrew">최대 인원</label>
          <Input
            type="number"
            min={2}
            max={6}
            name="maxCrew"
            value={maxCrew}
            onChange={(e) => setMaxCrew(Number(e.target.value))}
          />
        </ColDiv>

        <ColDiv>
          <label htmlFor="crewContent">Crew Content</label>
          <Input
            type="text"
            name="crewContent"
            value={crewContent}
            onChange={(e) => setCrewContent(e.target.value)}
          />
        </ColDiv>

        <ColDiv>
          <Button type="submit" disabled={createStatus === 'loading'}>
            생성하기
          </Button>
        </ColDiv>
      </Form>
    </Wrapper>
  );
}

export default CreateCrew;