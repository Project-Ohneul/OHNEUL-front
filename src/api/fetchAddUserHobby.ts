import axios from 'axios';

interface UserHobby {
  user_id: string;
  hobby_id: number[];
}

interface AddUserHobbyResponse {
  message: string;
  data: string;
}

const fetchAddUserHobby = (
  userHobby: UserHobby,
): Promise<AddUserHobbyResponse> => {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/user-hobby/join`,
    userHobby,
  );
};

export default fetchAddUserHobby;
