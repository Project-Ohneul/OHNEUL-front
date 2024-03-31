import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  InfoText,
  Container,
  Title,
  ThemeItemContainer,
  ThemeItemBtn,
  SubmitBtn,
  MarginTag,
} from '../Components/styles/Common';
import { fetchGetThemes } from '../api/fetchTheme';
import { WaitModal } from '../Components/Modal/ChatModal';

interface Themes {
  theme_id: number;
  theme: string;
  clicked?: boolean;
}

function Theme({ socket }: any) {
  const {
    data: availableThemes,
    isLoading,
    isError,
  } = useQuery<Themes[], Error>(['get-theme'], fetchGetThemes, {
    onSuccess: () => console.log('theme data 가져오기 성공'),
    onError: () => console.log('theme data 가져오기 실패'),
  });

  const [theme, setTheme] = useState<Themes[]>([]);
  const [wait, setWait] = useState<boolean>(false);
  const userSelectTheme: string = theme
    .filter((item) => item.clicked === true)
    .map((item) => item.theme)[0];

  useEffect(() => {
    if (availableThemes) setTheme(availableThemes);
  }, [availableThemes]);

  const clickBtn = (id: number) => {
    setTheme((prev) =>
      prev.map((item) =>
        item.theme_id === id
          ? { ...item, clicked: true }
          : { ...item, clicked: false },
      ),
    );
  };

  const matchingcStart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!userSelectTheme) alert('최소 1개를 선택해주세요');
    e.preventDefault();
    socket.emit('selectTheme', userSelectTheme);
  };

  const navigate = useNavigate();
  useEffect(() => {
    function waitMessageCallback() {
      setWait(true);
    }

    function startMessageCallback() {
      setWait(false);
      navigate('/chat');
    }
    socket.on('wait', waitMessageCallback);
    socket.on('start', startMessageCallback);
    return () => {
      socket.off('wait', waitMessageCallback);
      socket.off('start', startMessageCallback);
    };
  }, [wait]);

  const onClose = (e: any) => {
    e.stopPropagation();
    console.log('상대 찾기 취소버튼', wait);
    socket.emit('userExit');
    setWait(false);
  };

  if (isLoading) return <div>theme data 가져오는 중입니다.</div>;
  if (isError) return <div>theme data 가져오기 실패</div>;

  return (
    <>
      <Container>
        <Title>오늘 당신은?</Title>
        <ThemeItemContainer>
          {theme?.map((item) => (
            <ThemeItemBtn
              key={item.theme_id}
              onClick={() => clickBtn(item.theme_id)}
              clicked={item.clicked}
            >
              {item.theme}
            </ThemeItemBtn>
          ))}
        </ThemeItemContainer>
        {wait && <WaitModal onClose={onClose} />}
        <InfoText>최대 1개만 선택 가능합니다.</InfoText>
        <MarginTag margin={50}></MarginTag>
        <SubmitBtn onClick={matchingcStart}>선택 완료</SubmitBtn>
      </Container>
    </>
  );
}

export default Theme;