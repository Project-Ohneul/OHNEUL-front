import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPersonOutline } from '@react-icons/all-files/io5/IoPersonOutline';
import { styled } from 'styled-components';

function MypageIcon() {
  const navigate = useNavigate();
  const goToMyPage = useCallback(() => {
    navigate('/mypage');
  }, []);
  return <IconPerson onClick={goToMyPage} />;
}

export default React.memo(MypageIcon);

const IconPerson = styled(IoPersonOutline)`
  font-size: 20px;
  margin: 18px 10px 5px 10px;
  color: gray;
`;
