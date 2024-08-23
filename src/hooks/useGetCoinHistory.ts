import { useQuery } from 'react-query';
import axios from 'axios';

interface ScoreProps {
  coin_history_id: number;
  user_id: string;
  used_coin: number;
  used_at: string;
}

interface useGetCoinHistoryProps {
  isLoading: boolean;
  isError: boolean;
  data: ScoreProps[] | null;
  isSuccess: boolean;
}

const fetchGetUserCoinHistory = async (
  userId: string,
): Promise<ScoreProps[]> => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/coin-history/${userId}`,
  );
  return response.data;
};

export const useGetCoinHistory = (userId: string): useGetCoinHistoryProps => {
  const { data, isLoading, isSuccess, isError } = useQuery(
    ['coinHistory', userId],
    async () => {
      return fetchGetUserCoinHistory(userId);
    },
  );
  const coinHistoryData = data ?? null;

  return { isLoading, isError, data: coinHistoryData, isSuccess };
};

export default useGetCoinHistory;
