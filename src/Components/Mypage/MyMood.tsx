/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyMoodModal from 'Components/Mypage/MyMoodModal';
import editButton from 'assets/images/editButton.png';
import { useQuery } from 'react-query';
import { extractUserId } from 'utils/extractCookie';

const MoodBtn = styled.button`
  border-radius: 10px;
  border: 0;
  padding: 1.5% 2vh;
  margin: 15px;
  font-size: 2vh;
  background: white;
  box-shadow: 1px 1px 1px rgba(41, 41, 41, 0.25);
`;
const MoodEditBtn = styled.img`
  cursor: pointer;
  margin: 0 1vh 0.5vh 1vh;
  width: 4vh;
  max-width: 30px;
`;
const MoodBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MyMood = () => {
  const [open, setOpen] = useState<string | any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleModal = (itemName: any) => {
    setOpen(open === itemName ? null : itemName);
  };
  const userId = extractUserId();
  const [datas, setData] = useState<string[]>([]);
  const handleCloseModal = () => {
    setOpen(null);
  };

  interface MoodTs {
    mood_id: number;
    mood: string;
  }
  const { isLoading, isError, data } = useQuery<MoodTs | any>(
    ['mymood'],
    async () => {
      const allMoodResponse = await axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/moods`)
        .then((res) => res.data);
      const userMoodResponse = await axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}`)
        .then((res) => res.data.mood_id);
      const mood = (): void => {
        const res = [];
        for (let i = 0; i < allMoodResponse.length; i += 1) {
          if (allMoodResponse[i].mood_id === userMoodResponse) {
            res.push(allMoodResponse[i].mood);
          }
        }
        setData(res);
      };
      return mood();
    },
    {
      refetchInterval: 3000,
    },
  );

  useEffect(() => {
    setData(data);
  }, [data]);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>내 기분 가져오기 실패</div>;

  return (
    <>
      <MoodBtnContainer>
        <Div>
          <Title>현재 기분</Title>
          <MoodEditBtn src={editButton} onClick={() => handleModal('mood')} />
        </Div>
        <Wrapper>
          <MoodBtn>{datas}</MoodBtn>
        </Wrapper>
      </MoodBtnContainer>
      {open === 'mood' && <MyMoodModal onClose={handleCloseModal} />}
    </>
  );
};

const Title = styled.p`
  font-size: 1.1rem;
  margin: 0;
  border: 0;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 20px;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
`;

export default MyMood;
