import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Container, Title } from 'Components/styles/Common';
import Header from 'Components/Common/Header/Header';
import Button from 'Components/Common/Button';
import { motion } from 'framer-motion';
import { extractUserId } from '../utils/extractCookie';

function Nickname() {
  const [nickname, setNickname] = useState('');
  const userId = extractUserId();

  const navigator = useNavigate();

  const goHobbt = () => {
    navigator('/favorite');
  };

  const fetchAddUserNickname = async (username: string): Promise<string> => {
    return axios.patch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
      username,
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${userId}`,
        );
        if (response.data.username) goHobbt();
      } catch (e) {
        throw new Error('유저 정보 가져오기 실패');
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    try {
      await fetchAddUserNickname(nickname);
      setNickname('');
      goHobbt();
    } catch (e) {
      throw new Error('유저 닉네임 등록 실패');
    }
  };

  return (
    <>
      <Header nonvisible={true} />
      <Container>
        <Title>사용 할 닉네임을 입력해주세요</Title>
        <Wrapper>
          <P>닉네임</P>
          <Input
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
        </Wrapper>
        <Button width="200px" height="40px" onClick={handleSubmit}>
          시작하기
        </Button>
      </Container>
    </>
  );
}

export default Nickname;

const Wrapper = styled.div`
  display: flex;
`;

const P = styled.p`
  margin: 5px 5px 0 0;
  font-weight: 800;
  font-size: 20px;
  padding: 10px;
  max-width: 50%;
`;

const Input = styled.input`
  height: 25px;
  margin: auto 0;
  border-radius: 10px;
  padding: 5px;
  color: black;
  font-size: 15px;
  font-weight: 800;
  background-color: lightgray;
  border: 0;
`;
