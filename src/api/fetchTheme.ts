/* eslint-disable import/prefer-default-export */
import axios from 'axios';

interface Themes {
  theme_id: number;
  theme: string;
}

export const fetchGetThemes = async (): Promise<Themes[]> => {
  const response = await axios.get('http://localhost:4000/themes');
  return response.data;
};