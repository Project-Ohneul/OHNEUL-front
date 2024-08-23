import styled from 'styled-components';
import KakaoImg from 'assets/images/kakaoBogo.png';
import { motion } from 'framer-motion';

const KakaoLoginButton = styled.button`
  background-color: #fae100;
  color: black;
  padding: 0.5vh 5vh;
  border: none;
  border-radius: 8px;
  font-size: 2vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  img {
    width: 5vh;
    margin-left: -4vh;
    margin-right: 2vh;
  }
`;

const KakaoLogin: React.FC = () => {
  const KakaoAuthRoot = `${process.env.REACT_APP_BASE_URL}/api/login/kakao`;
  function loginRedirect(): void {
    window.location.href = KakaoAuthRoot;
  }

  return (
    <motion.div
      className="loginPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 2 }}
      exit={{ opacity: 0 }}
    >
      <KakaoLoginButton onClick={loginRedirect}>
        <img alt="" src={KakaoImg}></img>
        카카오 로그인
      </KakaoLoginButton>
    </motion.div>
  );
};

export default KakaoLogin;
