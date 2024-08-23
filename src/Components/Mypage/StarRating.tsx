import { useState, useEffect } from 'react';
import axios from 'axios';
import { TiStarFullOutline } from '@react-icons/all-files/ti/TiStarFullOutline';
import { TiStarHalfOutline } from '@react-icons/all-files/ti/TiStarHalfOutline';
import { TiStarOutline } from '@react-icons/all-files/ti/TiStarOutline';
import { extractUserId } from 'utils/extractCookie';
import styled from 'styled-components';

const StarRating = () => {
  const userId = extractUserId();
  const [star, setStar] = useState<number[]>([0, 0, 0, 0, 0]); // 2가 풀 1 반
  const allZeros = star.every((num) => num === 0);

  const fetchScore = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/users/${userId}`,
      );
      const { score } = response.data;
      const myScore = Number(score);
      let roundedScore = Math.round(myScore * 2) / 2;
      if (roundedScore > 5) {
        roundedScore = 5;
      } else if (roundedScore < 0) {
        roundedScore = 0;
      }

      const starStates: number[] = [];
      for (let i = 0; i < 5; i += 1) {
        if (roundedScore >= i + 1) starStates.push(2);
        else if (roundedScore === i + 0.5) starStates.push(1);
        else starStates.push(0);
      }
      setStar(starStates);
    } catch (error) {
      throw new Error('유저 점수 가져오기 실패');
    }
  };

  useEffect(() => {
    fetchScore();
  }, []);

  return (
    <>
      <Wrap>
        <P>당신의 매너점수</P>
        {allZeros ? (
          <div
            style={{
              color: '#ffe598',
              flexDirection: 'column',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TiStarOutline size="50" />{' '}
            <p style={{ marginTop: '5px', fontSize: '12px' }}>
              등록된 점수가 없습니다
            </p>
            .
          </div>
        ) : (
          <Stars>
            {star.map((starState, idx) => {
              if (starState === 2) {
                return <TiStarFullOutline key={idx} size="50" />;
              }
              if (starState === 1) {
                return (
                  <div key={idx}>
                    <TiStarHalfOutline key={idx} size="50" />
                  </div>
                );
              }
              return <TiStarOutline key={idx} size="50" />;
            })}
          </Stars>
        )}
      </Wrap>
    </>
  );
};

export default StarRating;

const Wrap = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Stars = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-between;
  width: 100%;
  padding: 10px 10px 2vh 0;
  color: #ffe598;
`;

const P = styled.p`
  margin: 2%;
  width: 180px;
  font-weight: 600;
`;
