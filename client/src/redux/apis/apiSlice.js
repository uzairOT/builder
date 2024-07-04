import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const getTokenFromLocalStorage = () => {
  let userInfo = localStorage.getItem('userInfo');
  try {
    console.log(userInfo)
    userInfo = (userInfo !== 'undefined' && userInfo) ? JSON.parse(userInfo) : null;
  } catch (e) {
    console.error("Error parsing userInfo from localStorage", e);
    userInfo = null;
  }
  const pathnameArr = window.location.pathname.split('/');
  console.log(pathnameArr);
  const token = userInfo?.token;
  
  if (token) {
    console.log('Test', userInfo);
    return token;
  } else {
    if(pathnameArr[1] === 'invitation'){
      return;
    }
    if (window.location.pathname !== '/login' ) {
      window.location.href = '/login';
    }
  }
};


const baseQuery = fetchBaseQuery({ baseUrl: '', headers: {authorization: `Bearer ${getTokenFromLocalStorage()}`} });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User','Project'],
  endpoints: (builder) => ({}),
});
