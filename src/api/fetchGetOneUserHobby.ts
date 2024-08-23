import axios from 'axios';
import fetchGetHobbys from './fetchHobby';

interface Props {
  user_hobby_id: string;
  user_id: string;
  hobby_id: string;
}

export const fetchGetOneUserHobby = async (userId: string) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/user-hobby/${userId}`,
  );
  return response.data;
};

export const fecthGetUserHobby = async (otherId: string) => {
  try {
    const totalMoodData = await fetchGetHobbys();
    const response = await fetchGetOneUserHobby(otherId);
    const otherHobby = response.map((item: Props): string => item.hobby_id);
    const otherHobbyObj = otherHobby.map((item: number): string | undefined => {
      return totalMoodData.find((hobby) => hobby.hobby_id === item)?.hobby;
    });

    return otherHobbyObj;
  } catch (e) {
    throw new Error('상대방 취미 데이터 가져오기 실패');
  }
};
