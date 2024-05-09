import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import Redirect from 'Components/Auth/Redirect';
import io from 'socket.io-client';
import Admin from 'pages/Admin';
import ManageUsers from 'pages/admin/ManageUsers';
import EditHobby from 'pages/admin/EditHobby';
import EditTheme from 'pages/admin/EditTheme';
import EditMood from 'pages/admin/EditMood';
import PostAnnouncement from 'pages/admin/PostAnnouncement';

import Home from 'pages/Home';
import Favorite from 'pages/Hobby';
import Mood from 'pages/Mood';
import Theme from 'pages/Theme';
import MyPage from 'pages/MyPage';
import Checkout from 'pages/Checkout';
import Success from 'pages/Success';
import Fail from 'pages/Fail';
import Chat from 'pages/Chat';
import CoinHistory from 'pages/CoinHistory';
import Announcement from 'Components/Mypage/Announcement';
import AnnouncementDetail from 'Components/Mypage/AnnouncementDetail';

const socket = io(`${process.env.REACT_APP_BASE_URL}`, {
  timeout: 120000,
});


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login/kakao" element={<Redirect />} />
        <Route path="/login/naver" element={<Redirect />} />
        <Route path="/" element={<Login />} />
        <Route path="/">
          <Route path="" element={<Home />}>
            <Route path="favorite" element={<Favorite />} />
            <Route path="mood" element={<Mood />} />
            <Route path="theme" element={<Theme socket={socket} />} />
            <Route path="mypage" element={<MyPage />} />
          </Route>
        </Route>
        <Route path="/payment" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
        <Route path="/coinhistory" element={<CoinHistory />} />
        <Route
          path="mypage/announcement/"
          element={<Announcement></Announcement>}
        ></Route>
        <Route
          path="mypage/announcement/:id"
          element={<AnnouncementDetail />}
        />
        <Route path="/*" element={<NotFound />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/manageusers" element={<ManageUsers />} />
        <Route path="/admin/edithobby" element={<EditHobby />} />
        <Route path="/admin/edittheme" element={<EditTheme />} />
        <Route path="/admin/editmood" element={<EditMood />} />
        <Route path="/admin/postannouncement" element={<PostAnnouncement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
