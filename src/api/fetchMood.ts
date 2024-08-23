import axios from 'axios';

export const fetchGetMood = async (): Promise<Mood[]> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/moods`,
    );
    return response.data;
  } catch (error) {
    throw new Error('전체 기분 데이터 가져오기 실패');
  }
};

export interface Mood {
  mood_id: number;
  mood: string;
}

export const fetchUserMood = async (otherId: string): Promise<string> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/users/${otherId}`,
    );
    const otherMoodId = response.data.mood_id;

    const allMoods = await fetchGetMood();

    const otherMoodObject = allMoods.find(
      (mood) => mood.mood_id === otherMoodId,
    );

    return otherMoodObject ? otherMoodObject.mood : '';
  } catch (error) {
    throw new Error('상대방 기분 가져오기 실패');
  }
};
