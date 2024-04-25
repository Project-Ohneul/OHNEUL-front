import { useEffect, useMemo, useState } from 'react';
import {
  ItemBtn,
  Container,
  ItemContainer,
  SubmitBtn,
} from 'Components/styles/Common';
import { useQuery } from 'react-query';
import { fetchGetMood } from 'api/fetchMood';
import { useNavigate } from 'react-router-dom';
import { extractReward } from 'utils/extractCookie';
import InfoHeader from 'Components/Common/InfoHeader';
import ButtonList from 'Components/Common/ButtonList';
import InfoFooter from 'Components/Common/InfoFooter';
import { useAddUserMoodMutation } from '../hooks/useUserMoodMutation';

interface MoodTs {
  mood_id: number;
  mood: string;
  clicked?: boolean;
}

function Mood() {
  const {
    data: availableMoods,
    isLoading,
    isError,
  } = useQuery<MoodTs[], Error>(['get-mood'], fetchGetMood, {
    onSuccess: () => console.log('mood data 가져오기 성공'),
    onError: () => console.log('mood data 가져오기 실패'),
  });

  const [mood, setMood] = useState<MoodTs[]>([]);
  useEffect(() => {
    const data = extractReward();
    if (data === 'T') {
      setTimeout(() => {
        alert('매일 접속 보상이 지급되었습니다');
      }, 1000);
    }
  }, []);

  const userSelectMood = mood
    .filter((item) => item.clicked === true)
    .map((item) => item.mood_id)[0];

  const seletedMood = useMemo(() => userSelectMood, [mood]);

  useEffect(() => {
    if (availableMoods) setMood(availableMoods);
  }, [availableMoods]);

  const clickBtn = (id: number) => {
    setMood((prev) =>
      prev.map((item) =>
        item.mood_id === id
          ? { ...item, clicked: true }
          : { ...item, clicked: false },
      ),
    );
  };

  const { mutate: addUserMood } = useAddUserMoodMutation();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (seletedMood !== null) {
      addUserMood({
        mood_id: seletedMood,
      });
      navigate('/theme');
    } else {
      alert('1개 이상 골라주세요!');
    }
  };

  if (isLoading) return <div>mood data 가져오는 중입니다.</div>;
  if (isError) return <div>mood data 가져오기 실패</div>;

  return (
    <>
      <Container>
        <InfoHeader
          infoTitle="오늘 당신은?"
          infoContent="오늘 기분을 선택해주세요"
        />
        <ButtonList items={mood} onClick={clickBtn} />
        <InfoFooter infoText="최대 1개만 선택 가능합니다." />
        <SubmitBtn onClick={handleSubmit}>선택 완료</SubmitBtn>
      </Container>
    </>
  );
}

export default Mood;
