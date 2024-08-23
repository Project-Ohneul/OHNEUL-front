import axios from 'axios';

interface Themes {
  theme_id: number;
  theme: string;
}

const fetchGetThemes = async (): Promise<Themes[]> => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/themes`,
  );
  return response.data;
};

export default fetchGetThemes;
