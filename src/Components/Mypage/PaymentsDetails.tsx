/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { extractUserId } from 'utils/extractCookie';

const Container = styled.div`
  margin-top: 5px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 2vh;
`;

const PaymentsWrapper = styled.div`
  height: 400px;
  overflow: scroll;
`;

interface PaymentData {
  amount: number;
  coin: number;
  paymentKey: string;
}

const PaymentsDetails = () => {
  const userId = extractUserId();
  const [datas, setData] = useState<PaymentData[]>([]);
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const paymentDetail: any = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/payments/${userId}`,
        );
        setData(paymentDetail.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayments();
  }, []);
  const formatPaymentDate = (paymentKey: string) => {
    const dateAndTime = paymentKey.slice(5, 17); // "202404121645"
    const year = dateAndTime.slice(0, 4); // "2024"
    const month = dateAndTime.slice(4, 6); // "04"
    const day = dateAndTime.slice(6, 8); // "12"
    const hour = dateAndTime.slice(8, 10); // "16"
    const minute = dateAndTime.slice(10, 12); // "45"
    return `${year}-${month}-${day} ${hour}:${minute}`;
  };
  return (
    <PaymentsWrapper>
      {datas.map((el, id) => (
        <Container key={id}>
          <div>{`결제금액 : ${el.amount}원`}</div>
          <div>{`충전내역 : ${el.coin}코인`}</div>
          <div>{`결제일시 : ${formatPaymentDate(el.paymentKey)}`}</div>
        </Container>
      ))}
    </PaymentsWrapper>
  );
};

export default PaymentsDetails;
