/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const delUser = async (selectedUser: any) => {
  const fetchUser = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}/api/users/${selectedUser}`,
  );
  return fetchUser;
};

export default delUser;
