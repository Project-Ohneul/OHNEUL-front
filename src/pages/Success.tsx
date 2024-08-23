import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

function Success() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = Number(searchParams.get('amount'));
  const userId = '3fe2f2d4-3aa1-4227-92c8-ac706c3fde52';
  const coin = 200;

  const userPaymentData = {
    paymentKey,
    orderId,
    amount,
    coin,
    userId,
  };

  const navigate = useNavigate();

  const goTheme = () => {
    navigate('/theme');
  };

  useEffect(() => {
    confirmPayment();
  }, []);

  async function confirmPayment() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/payments/confirm`,
        userPaymentData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 201) {
        setIsConfirmed(true);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error:', error);
    }
  }

  return (
    <RequestWrapper>
      {isConfirmed ? (
        <CheckPaymentWrapper>
          <img
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
            alt="완료 이미지"
            width="120"
            height="120"
            loading="lazy"
          />
          <CheckPaymentTitle>결제를 완료했어요</CheckPaymentTitle>
          <CheckPaymentContentWrapper>
            <ContentWrapper>
              <span>결제 금액</span>
              <span>{amount}</span>
            </ContentWrapper>
            <ContentWrapper>
              <span>주문번호</span>
              <span id="orderId">{orderId}</span>
            </ContentWrapper>
          </CheckPaymentContentWrapper>
          <PaymentBtn onClick={goTheme}>메인으로 이동하기</PaymentBtn>
        </CheckPaymentWrapper>
      ) : (
        <Wrapper>
          <Wrapper>
            <img
              src="https://static.toss.im/lotties/loading-spot-apng.png"
              alt=""
              loading="lazy"
            />
          </Wrapper>
        </Wrapper>
      )}
    </RequestWrapper>
  );
}

export default Success;

const Wrapper = styled.div``;

const RequestWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 667px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PaymentBtn = styled.button`
  width: 70%;
  height: 40px;
  color: white;
  margin: 10px;
  background: #0075ff;
  border-radius: 5px;
  border: 0;
  min-width: 300px;
  margin-top: 100px;
`;

const CheckPaymentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 667px;
  height: 100%;
`;

const CheckPaymentTitle = styled.h2`
  margin: 50px;
`;

const CheckPaymentContentWrapper = styled.div`
  width: 85%;
  min-height: 30px;
  margin: 20px 0 0 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: 80%;
  max-width: 500px;
  display: flex;
  justify-content: space-between;
  margin: 8px;
`;
