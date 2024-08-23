/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import meltedCookie from 'utils/meltedCookie';

export const updateHobbies = async (hobbies: any) => {
  const [userId] = meltedCookie();
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/hobbies/${userId}`,
      hobbies,
    );
    return response.data;
  } catch (error) {
    // 에러가 발생했을 경우 적절한 처리
    console.error('취미 업데이트 중 에러:', error);
    throw error;
  }
};
