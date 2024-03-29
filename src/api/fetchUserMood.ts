/* eslint-disable import/prefer-default-export */
import axios from 'axios';

interface Mood {
  mood: string;
}

export const fetchAddUserMood = async (userMood: Mood): Promise<Mood> => {
  return axios.post('https://jsonplaceholder.typicode.com/posts', userMood);
  // http://localhost:3000/moods/join
};
