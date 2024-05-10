import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const getTokenFromLocalStorage = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
 const token = userInfo?.token
 console.log('TESt ',userInfo);
   return token;
};

const baseQuery = fetchBaseQuery({ baseUrl: '', headers: {authorization: `Bearer ${getTokenFromLocalStorage()}`} });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User','Project'],
  endpoints: (builder) => ({}),
});
