import { useEffect, useState } from 'react';
import { FaStar } from '@react-icons/all-files/fa/FaStar';
import { useNavigate } from 'react-router-dom';
import { extractOtherUserId } from 'utils/extractCookie';
import styled from 'styled-components';

type StarProps = {
  score: number;
  paddingBottom?: string;
  size?: string
};

function Star({ score, size,paddingBottom }: StarProps): JSX.Element {
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const clickStates = [...clicked];
    for (let i = 0; i < score; i += 1) {
      clickStates[i] = true;
    }
    setClicked(clickStates);
  }, []);

  return (
    <Wrap paddingBtm={paddingBottom}>
      <Stars>
        {[0, 1, 2, 3, 4].map((el, idx) => {
          return (
            <FaStar
              key={idx}
              size={size || '3vh'}
              className={clicked[el] ? 'yellowStar' : ''}
            />
          );
        })}
      </Stars>
    </Wrap>
  );
}

export default Star;

const Wrap = styled.div<{ paddingBtm?: string }>`
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.paddingBtm || '15px'};
  overflow-x: hidden;
  font-size: 1vh;
`;

const Stars = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-between;
  width: 100%;
  padding: 10px 10px 2vh 0;

  & svg {
    color: gray;
    cursor: pointer;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
