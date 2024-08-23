/* eslint-disable no-console */
import NaverBogo from 'assets/images/naverBogo.jpeg';
import KakaoBogo from 'assets/images/kakaoBogo.png';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { extractFlatform, extractUserId } from 'utils/extractCookie';

const Kakao = styled.img`
  width: 3%;
  height: 3%;
  margin: 0 1%;
  min-width: 35px;
  min-height: 35px;
  max-width: 40px;
  max-height: 40px;
  border-radius: 15px;
`;

const Naver = styled.img`
  width: 3%;
  height: 3%;
  margin: 1%;
  min-width: 25px;
  min-height: 25px;
  max-width: 30px;
  max-height: 30px;
  border-radius: 5px;
`;

function SocialImage() {
  const [name, setName] = useState<string>('');
  const userId = extractUserId();
  const flatform = extractFlatform();

  useEffect(() => {
    console.log(flatform);
    const fetchUserName = async () => {
      if (!userId) {
        console.error('User ID is null or undefined');
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/users/${userId}`,
        );
        const userName = response.data.username;
        if (userName) {
          setName(userName);
        } else {
          console.error('Username is null or undefined');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <Wrapper>
      {flatform === 'kakao' ? (
        <>
          <Kakao src={KakaoBogo}></Kakao>
          <p>당신의 오늘은 어떠셨나요 {name}님?</p>
        </>
      ) : (
        <>
          <Naver src={NaverBogo}></Naver>
          <p>당신의 오늘은 어떠셨나요 {name}님?</p>
        </>
      )}
    </Wrapper>
  );
}

export default SocialImage;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
