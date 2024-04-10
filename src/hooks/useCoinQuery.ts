/* eslint-disable import/prefer-default-export */
import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

interface UserCoin {
  coin: number;
}

interface CoinQueryClient {
  isCoinLoading: boolean;
  isCoinError: boolean;
  userCoinState: number;
  isSuccess: boolean;
}

const fetchUser = async (userId: string) => {
  const response = await axios.get(`http://localhost:4000/users/${userId}`);
  return response.data;
};

export const useCoinQuery = (userId: string): CoinQueryClient => {
  const {
    isLoading: isCoinLoading,
    isError: isCoinError,
    data,
    isSuccess,
  } = useQuery<UserCoin>(['coin', userId], () => fetchUser(userId), {
    refetchInterval: 6000,
  });

  const userCoinState: number = data?.coin || 0;

  return { isCoinLoading, isCoinError, userCoinState, isSuccess };
};
