// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { logout, clearAuth } from 'stores/slices/userSlice';
// import axios from 'axios';
// import meltedCookie from 'utils/meltedCookie';

// interface User {
//   user: {
//     value: { user_id: string; refreshToken: string; provider: string };
//     isLogin: boolean;
//   };
// }
// const WithDrawal: React.FC = () => {
//   const user = useSelector((state: User) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const deleteCookie = (name: string): void => {
//     document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
//   };
//   const userId = user.value.user_id;

//   useEffect(() => {
//     // isLogin 상태가 변경될 때마다 모니터링하여 필요한 작업 수행
//     if (!user.isLogin) {
//       // 로그아웃 처리 후 페이지 이동
//       alert('로그인상태를 확인해주세요.');
//       console.log(user.isLogin, 'handle끝2');
//     }
//   }, [user.isLogin, navigate]);

//   const handleWithDrawal = async () => {
//     const userDelete = async (userid: string) => {
//       try {
//         const response = await axios.delete(
//           `http://localhost:4000/users/${userid}`,
//         );
//         console.log(response.data);
//         return response.data;
//       } catch (error) {
//         console.error(error);
//         throw error;
//       }
//     };

//     userDelete(userId)
//       .then((res) => {
//         console.log(res, 'success to delete user');
//       })
//       .catch((error) => {
//         console.error(error, 'failed to delete user');
//       });

//     const [flatform] = meltedCookie();
//     if (flatform === 'naver') {
//       try {
//         const response = await axios.post('/logout/naver', null, {
//           withCredentials: true,
//         });
//         console.log(response.data);
//         if (response.status === 200) {
//           console.log('로그아웃');
//           dispatch(clearAuth());
//           dispatch(logout());
//           deleteCookie('user_id');
//           deleteCookie('refreshToken');
//           deleteCookie('provider');
//           navigate('/');
//         } else {
//           console.log('실패');
//         }
//       } catch (error) {
//         console.error('로그아웃', error);
//       }
//     } else if (flatform === 'kakao') {
//       try {
//         const response = await axios.post('/logout/kakao', null, {
//           withCredentials: true,
//         });
//         console.log(response.data);
//         if (response.status === 200) {
//           console.log('로그아웃');
//           dispatch(clearAuth());
//           dispatch(logout());
//           deleteCookie('user_id');
//           deleteCookie('refreshToken');
//           deleteCookie('provider');
//           navigate('/');
//         } else {
//           console.log('실패');
//         }
//       } catch (error) {
//         console.error('로그아웃', error);
//       }
//     }
//   };
//   return (
//     <div>
//       <button onClick={handleWithDrawal}>회원탈퇴</button>
//     </div>
//   );
// };

// export default WithDrawal;