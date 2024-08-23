import axios from 'axios';

interface User {
  user_id: string;
  username: string;
  score: string;
  coint: number;
  mood_id: number;
  report: number;
  deleted_at: unknown;
  updated_at: string;
  created_at: string;
  admin: boolean;
  nickname: string;
}

const fetchGetUser = async (userId: string): Promise<User> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/users/${userId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('전체 기분 데이터 가져오기 실패');
  }
};

export default fetchGetUser;
