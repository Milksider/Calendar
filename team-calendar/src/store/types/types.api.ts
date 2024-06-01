import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { ITypes } from '@Components/Modals';
import * as process from 'process';

export const typesApi = createApi({
  reducerPath: 'typesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL
  }),
  tagTypes: ['EventTypes'],
  endpoints: build => ({
    fetchAllTypes: build.query<ITypes[], string>({
      query: () => ({
        url: `/event-types`,
      }),
      providesTags: results => ['EventTypes'],
    }),
    createType: build.mutation<ITypes, ITypes>({
      query: (type) => ({
        url: `/event-types`,
        method: 'POST',
        body: type,
      }),
      invalidatesTags: ['EventTypes'],
    }),
    changeType: build.mutation<ITypes, ITypes>({
      query: (type) => ({
        url: `/event-types/item/${type.id}`,
        method: 'PATCH',
        body: type,
      }),
      invalidatesTags: ['EventTypes'],
    }),
    deleteType: build.mutation<ITypes, ITypes>({
      query: (type) => ({
        url: `/event-types/item/${type.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['EventTypes'],
    }),
  }),
});

export const {
  useCreateTypeMutation,
  useChangeTypeMutation,
  useFetchAllTypesQuery,
  useDeleteTypeMutation,
} = typesApi;
