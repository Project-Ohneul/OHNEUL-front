import axios from 'axios';
import { useQuery } from 'react-query';

interface UserCoin {
  coin: number;
}

interface CoinQueryClient {
  isCoinLoading: boolean;
  isCoinError: boolean;
  userCoinState: UserCoin | undefined;
}

const fetchUser = async (userId: string) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/users/${userId}`,
  );
  return response.data;
};

const useCoinQuery = (userId: string): CoinQueryClient => {
  const {
    isLoading: isCoinLoading,
    isError: isCoinError,
    data: userCoinState,
  } = useQuery<UserCoin>(['coin', userId], () => fetchUser(userId), {
    staleTime: 0,
  });

  return { isCoinLoading, isCoinError, userCoinState };
};

export default useCoinQuery;
