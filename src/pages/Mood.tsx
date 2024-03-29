import React, { useEffect, useState } from 'react';
import {
  ItemBtn,
  InfoText,
  Container,
  Title,
  ItemContainer,
  SubmitBtn,
  MarginTag,
} from 'Components/Common/Tag';
import { useQuery } from 'react-query';
import { fetchGetMood } from 'api/fetchMood';
import { useNavigate } from 'react-router-dom';
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
  const userSelectMood = mood
    .filter((item) => item.clicked === true)
    .map((item) => item.mood)[0];

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
    if (userSelectMood) {
      addUserMood({
        mood: userSelectMood,
      });
      navigate('/theme')
    } else {
      console.log('Please select a mood before submitting.');
    }
  };

  if (isLoading) return <div>mood data 가져오는 중입니다.</div>;
  if (isError) return <div>mood data 가져오기 실패</div>;

  return (
    <>
      <Container>
        <Title>오늘 당신은?</Title>
        <ItemContainer>
          {mood?.map((item) => (
            <ItemBtn
              key={item.mood_id}
              onClick={() => clickBtn(item.mood_id)}
              clicked={item.clicked}
            >
              {item.mood}
            </ItemBtn>
          ))}
        </ItemContainer>
        <InfoText>최대 1개만 선택 가능합니다.</InfoText>
        <MarginTag margin={50}></MarginTag>
        <SubmitBtn onClick={handleSubmit}>선택 완료</SubmitBtn>
      </Container>
    </>
  );
}

export default Mood;
