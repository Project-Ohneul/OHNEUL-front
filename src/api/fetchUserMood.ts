import axios from 'axios';
import { extractUserId } from '../utils/extractCookie';

interface Data {
  mood_id: number;
}

const updateUserData = async (userData: Data): Promise<Data> => {
  const userId = extractUserId();
  return axios.patch(
    `${process.env.REACT_APP_BASE_URL}/api/users/${userId}`,
    userData,
  );
};

export default updateUserData;
