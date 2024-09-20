import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoContainer, LogoImage, LogoTitle } from '../../styles/Header';
import appLogo from '../../../assets/images/appLogo.png';

function Logo() {
  const navigate = useNavigate();
  const goToThemePage = useCallback(() => {
    navigate('/home/theme');
  }, []);

  return (
    <LogoContainer onClick={goToThemePage}>
      <LogoImage src={appLogo} alt="" />
      <LogoTitle>OHNEUL</LogoTitle>
    </LogoContainer>
  );
}

export default React.memo(Logo);
