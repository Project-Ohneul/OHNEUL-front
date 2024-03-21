import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Favorite from '../pages/Favorite';
import Mood from '../pages/Mood';
import Home from '../pages/Home';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="favorite" element={<Favorite />} />
          <Route path="mood" element={<Mood />} />
        </Route>
        <Route path="/mypage" element={<div>마이페이지</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
