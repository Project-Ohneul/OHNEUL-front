import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGetOneUserHobby } from 'api/fetchGetOneUserHobby';
import { extractUserId } from 'utils/extractCookie';

const useCheckHobbiesAndNavigate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = extractUserId();
    const fetchDataAndNavigate = async () => {
      try {
        const user = await fetchGetOneUserHobby(userId);
        if (Object.keys(user).length > 0) {
          navigate('/home/mood');
        }
      } catch (error) {
        throw new Error('유저 취미 데이터 확인 실패');
      }
    };

    fetchDataAndNavigate();
  }, [navigate]);
};

export default useCheckHobbiesAndNavigate;
