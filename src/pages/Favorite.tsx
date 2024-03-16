import React from 'react';
import { useNavigate } from 'react-router-dom';

function Favorite() {
  const navigate = useNavigate();

  const navigateMood = () => {
      navigate("/mood")
  }
  return (
    <>
      <p>favorite page입니다.</p>
      <button onClick={navigateMood}>기분 선택 완료</button>
    </>
  );
}

export default Favorite;
