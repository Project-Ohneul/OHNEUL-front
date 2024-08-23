/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const FetchAddTheme = async (selectedTheme: string) => {
  const fetchTheme = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/themes/join`,
    {
      theme: selectedTheme,
    },
  );
  return fetchTheme;
};

export const FetchDelTheme = async (selectedtheme: any) => {
  const fetchTheme = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}/api/themes/${selectedtheme}`,
  );
  return fetchTheme;
};
