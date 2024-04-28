import { useState, useEffect } from 'react';
import axios from 'axios';
import meltedCookie from 'utils/meltedCookie';
import plusHeart from 'assets/images/plusHeart.png';
import minusHeart from 'assets/images/minusHeart.png';
import styled from 'styled-components';

const Heart = styled.img`
  width: 8vh;
`;
const Desc = styled.div`
  font-size: 2vh;
  font-weight: 600;
  color: #000000;
  margin: 10px;
`;

const StarRating = () => {
  const [flatform, token, rewardCoin, userId] = meltedCookie();
  const [data, setData] = useState<number>(0);
  useEffect(() => {
    const fetchScore = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}`,
      );

      return setData(response.data.score);
    };
    fetchScore();
  }, []);

  const renderHerat = (score: number) => {
    const strToNumb = Number(score);
    let plusCount;
    let minusCount;
    if (strToNumb >= 4.5) {
      plusCount = 5;
      minusCount = 0;
    } else if (strToNumb >= 4) {
      plusCount = 4;
      minusCount = 1;
    } else {
      minusCount = Math.ceil(5 - strToNumb);
      plusCount = Math.floor(strToNumb);
    }

    const count = [];
    const desc = [];
    for (let i = 0; i < plusCount; i += 1) {
      count.push(<Heart key={`plus${i}`} src={plusHeart} alt="ph"></Heart>);
    }
    for (let j = 0; j < minusCount; j += 1) {
      count.push(<Heart key={`minus${j}`} src={minusHeart} alt=""></Heart>);
    }
    switch (plusCount) {
      case 0.0:
        desc.push(<Desc key="desc">채팅을시작해주세요.</Desc>);
        break;
      case 1:
        desc.push(<Desc key="desc">1점</Desc>);
        break;
      case 2:
        desc.push(<Desc key="desc">2점</Desc>);
        break;
      case 3:
        desc.push(<Desc key="desc">3점</Desc>);
        break;
      case 4:
        desc.push(<Desc key="desc">4점</Desc>);
        break;
      case 5:
        desc.push(<Desc key="desc">5점</Desc>);
        break;
      default:
        break;
    }

    return [desc, count];
  };

  return <div>{renderHerat(data)}</div>;
};

export default StarRating;
