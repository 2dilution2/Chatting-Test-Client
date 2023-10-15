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

function CreateChatRoom() {
   // 기존 상태 값
   const [title, setTitle] = useState('');
   const [thumbnailImgUrl, setThumbnailImgUrl] = useState('');
   const [crewPlace, setCrewPlace] = useState('KOREA');
   const [crewStatus, setCrewStatus] = useState('OPEN');
   const [maxCrew, setMaxCrew] = useState(2);
   const [travelStart, setTravelStart] = useState('');
   const [travelEnd, setTravelEnd] = useState('');
   const [latitude, setLatitude] = useState(null);
   const [longitude, setLongitude] = useState(null);
   const [crewContent, setCrewContent] = useState('');

  const { createChatRoom, createStatus } = useMutationCreate();

  const onSubmit = (e) => {
    e.preventDefault();
    createChatRoom({ title, thumbnailImgUrl, crewPlace, crewStatus, maxCrew, travelStart, travelEnd, latitude, longitude, crewContent });
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
          <label htmlFor="thumbnailImgUrl">Thumbnail Image URL</label>
          <Input type="text" name="thumbnailImgUrl" value={thumbnailImgUrl} onChange={(e) => setThumbnailImgUrl(e.target.value)} />
        </ColDiv>
        
        <ColDiv>
          <label htmlFor="crewPlace">Crew Place</label>
          <select name="crewPlace" value={crewPlace} onChange={(e) => setCrewPlace(e.target.value)}>
            <option value="KOREA">KOREA</option>
            <option value="ABROAD">ABROAD</option>
          </select>
        </ColDiv>
        
        <ColDiv>
          <label htmlFor="crewStatus">Crew Status</label>
          <select name="crewStatus" value={crewStatus} onChange={(e) => setCrewStatus(e.target.value)}>
            <option value="OPEN">OPEN</option>
            <option value="CLOSE">CLOSE</option>
          </select>
        </ColDiv>

        <ColDiv>
          <label htmlFor="maxCrew">최대 인원</label>
          <Input
            type="number"
            min={2}
            max={5}
            name="maxCrew"
            value={maxCrew}
            onChange={(e) => setMaxCrew(Number(e.target.value))}
          />
        </ColDiv>

        <ColDiv>
          <label htmlFor="travelStart">Travel Start</label>
          <Input
            type="date"
            name="travelStart"
            value={travelStart}
            onChange={(e) => setTravelStart(e.target.value)}
          />
        </ColDiv>

        <ColDiv>
          <label htmlFor="travelEnd">Travel End</label>
          <Input
            type="date"
            name="travelEnd"
            value={travelEnd}
            onChange={(e) => setTravelEnd(e.target.value)}
          />
        </ColDiv>

        <ColDiv>
          <label htmlFor="latitude">Latitude</label>
          <Input
            type="number"
            name="latitude"
            value={latitude}
            onChange={(e) => setLatitude(Number(e.target.value))}
          />
        </ColDiv>

        <ColDiv>
          <label htmlFor="longitude">Longitude</label>
          <Input
            type="number"
            name="longitude"
            value={longitude}
            onChange={(e) => setLongitude(Number(e.target.value))}
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

export default CreateChatRoom;