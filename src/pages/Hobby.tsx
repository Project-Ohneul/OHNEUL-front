import { useEffect, useState } from 'react';
import { Container } from 'Components/styles/Common';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import InfoHeader from 'Components/Common/InfoHeader';
import ButtonList from 'Components/Common/ButtonList';
import InfoFooter from 'Components/Common/InfoFooter';
import AlertModal from 'Components/Modal/AlertModal';
import Button from 'Components/Common/Button';
import useCheckHobbiesAndNavigate from 'hooks/useCheckHobbiesAndNavigateHook';
import { extractUserId } from 'utils/extractCookie';
import { useAddUserHobbyMutation } from '../hooks/useUserHobbyMutation';
import fetchGetHobbys from '../api/fetchHobby';

interface Hobby {
  hobby_id: number;
  hobby: string;
  clicked?: boolean;
}

function Hobby() {
  useCheckHobbiesAndNavigate();
  const [Alert, setAlert] = useState<boolean>(false);

  const [hobby, setHobby] = useState<Hobby[]>([]);
  const userSelectHobby = hobby
    .filter((item) => item.clicked === true)
    .map((item) => item.hobby_id);

  const {
    isLoading,
    isError,
    data: availableHobbies,
  } = useQuery('get-hobbys', fetchGetHobbys);

  useEffect(() => {
    if (availableHobbies) setHobby(availableHobbies);
  }, [availableHobbies]);

  const clickBtn = (id: number) => {
    setHobby((prevHobby) =>
      prevHobby.map((item) =>
        item.hobby_id === id ? { ...item, clicked: !item.clicked } : item,
      ),
    );
  };
  const userId = extractUserId();
  const { mutate: addUserHobby } = useAddUserHobbyMutation();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (userSelectHobby.length >= 4 || userSelectHobby.length === 0) {
      setAlert(true);
      return;
    }
    try {
      await addUserHobby({
        user_id: userId,
        hobby_id: userSelectHobby,
      });
      navigate('/mood');
    } catch (e) {
      navigate('/mood');
    }
  };

  const alertClose = () => {
    setAlert(false);
  };

  return (
    <Container>
      {Alert && (
        <AlertModal
          icon="warning"
          title="기분 등록 실패"
          msg="취미는 1개 ~ 3개만 골라주세요"
          btn1="확인"
          onClose={alertClose}
        />
      )}
      <InfoHeader
        infoTitle="평소 당신은?"
        infoContent="관심사를 선택해주세요"
      />
      <ButtonList
        items={hobby}
        onClick={clickBtn}
        isLoading={isLoading}
        isError={isError}
      />
      <InfoFooter infoText="최소 1개, 최대 3개만 선택 가능" />
      <Button
        onClick={handleSubmit}
        width="80%"
        height="5%"
        maxheight="100px"
        fontSize="1.5vh"
        maxwidth="500px"
      >
        선택 완료
      </Button>
    </Container>
  );
}

export default Hobby;
