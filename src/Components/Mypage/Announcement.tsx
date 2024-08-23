/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pagination from 'utils/Pagination';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAnnouncements,
  selectAnnouncements,
} from 'stores/slices/announcementSlice';
import Arrow from 'assets/images/Arrow.png';
import { Link } from 'react-router-dom';
import { Wrapper } from 'Components/styles/Common';
import AnnouncementItem from './AnnouncementItem';

const AnnouncementTitle = styled.div`
  font-weight: 700;
  text-align: left;
  margin-left: 1vh;
  margin-top: 0.4vh;
`;
const BackButton = styled(Link)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;
const MenuTitle = styled.div`
  display: flex;
  flex-direction: row;
`;
const BorderLine = styled.div`
  margin-top: 1vh;
  border-bottom: 1px solid #ccc;
`;
const Item = styled.div`
  text-align: left;
`;

const Announcement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/notices`,
        );
        const sortedAnnouncements = response.data.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        dispatch(setAnnouncements(sortedAnnouncements));
      } catch (error) {
        console.error('공지 불러오기', error);
      }
    };
    fetchAnnouncements();
  }, [dispatch]);
  const announcements = useSelector(selectAnnouncements);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastAnnouncement = currentPage * pageSize;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - pageSize;
  const currentAnnouncements = announcements.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement,
  );
  return (
    <Wrapper
      width="100%"
      maxWidth="600px"
      // minHeight="95vh"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      align-items="flex-start"
    >
      <MenuTitle>
        <BackButton to="/mypage">
          <img src={Arrow} alt=""></img>
        </BackButton>
        <AnnouncementTitle>공지사항</AnnouncementTitle>
      </MenuTitle>
      <Item>
        <BorderLine></BorderLine>
        {currentAnnouncements.map((announcement: any, id: number) => (
          <AnnouncementItem key={id} announcement={announcement} />
        ))}
      </Item>
      <Pagination
        itemsCount={announcements.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Wrapper>
  );
};

export default Announcement;
