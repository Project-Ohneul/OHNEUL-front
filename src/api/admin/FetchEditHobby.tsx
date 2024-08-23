/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const FetchDelHobby = async (selectedHobbyId: any) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}/api/hobbies/${selectedHobbyId}`,
  );
  return response.data;
};

export const FetchAddHobby = async (hobby: any) => {
  const fetchAddHobby = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/hobbies/join`,
    {
      hobby,
    },
  );
  return fetchAddHobby;
};
