import axios from 'axios';

export const FetchAddMood = async () => {
  const fetchMood = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/moods/join`,
  );
  return fetchMood;
};

export const FetchDelMood = async (selectedMood: unknown) => {
  const fetchMood = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}/api/moods/${selectedMood}`,
  );
  return fetchMood;
};
