import axios from 'axios';

const FetchPostAnnouncement = async (title: string, notice: string) => {
  try {
    const announcementFetch = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/notices`,
      {
        title,
        notice,
      },
    );
    return announcementFetch.data;
  } catch (error) {
    throw new Error('공지사항 데이터 가져오기 실패');
  }
};

export default FetchPostAnnouncement;
