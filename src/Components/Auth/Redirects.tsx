import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import phrase from 'assets/images/appCatchphrase.png';

const PhraseContainer = styled.div``;
const Redirects: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('refreshToken='));
      try {
        if (token) {
          navigate('/');
        }
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert('로그인에 실패했습니다.');
      }
    };
    fetchToken();
  }, [dispatch, navigate]);

  return (
    <>
      <PhraseContainer>
        <img src={phrase} alt="phrase"></img>
      </PhraseContainer>
    </>
  );
};

export default Redirects;
