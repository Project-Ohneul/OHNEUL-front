import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import meltedCookie from 'utils/meltedCookie';

interface Usage {
  used_coin: number;
  used_at: string;
}
const Container = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const Usage = styled.div``;
const DateCont = styled.div``;

const CoinUsageDetails = () => {
  const [usage, setUsage] = useState<Usage[]>([]);
  const [userId] = meltedCookie();

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/coin-history/${userId}`,
        );
        setUsage(response.data);
      } catch (error) {
        throw new Error('유저 코인 내역 불러오기 싶래');
      }
    };
    fetchUsage();
  }, []);

  const formatKoreanDateTime = (dateTimeString: string): string => {
    try {
      const date = new Date(dateTimeString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    } catch (error) {
      throw new Error('코인 내역 시간 불러오기 싶래');
    }
  };
  return (
    <>
      <motion.div
        className="loginPage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        exit={{ opacity: 0 }}
      >
        <div>
          {usage.map((el, id) => (
            <Container key={id}>
              <Usage>사용코인 : {el.used_coin}</Usage>
              <DateCont>사용일시 : {formatKoreanDateTime(el.used_at)}</DateCont>
            </Container>
          ))}
        </div>
      </motion.div>
    </>
  );
};
export default CoinUsageDetails;
