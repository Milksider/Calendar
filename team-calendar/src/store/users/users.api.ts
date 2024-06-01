import {createApi} from '@reduxjs/toolkit/query/react';
import {IUser} from '@Pages/MainPage';
import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import * as process from 'process';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL
  }),
  endpoints: build => ({
    fetchAllUsers: build.query<IUser[], string>({
      query: () => ({
        url: `/users`,
      }),
      providesTags: results => ['Users'],
    }),
    createUser: build.mutation<IUser, IUser>({
      query: (user) => {
        return ({
          url: `/users`,
          method: 'POST',
          body: user,
        });
      },
      invalidatesTags: ['Users'],
    }),
    updateUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/users/item/${user.id}`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/users/item/${user.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useFetchAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApi;
