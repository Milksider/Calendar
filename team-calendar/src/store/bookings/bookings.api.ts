import { createApi } from '@reduxjs/toolkit/query/react';
import { IBooking, IBookingFetch, IBookingFetchParams } from '@Pages/MainPage';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import * as process from 'process';

export const bookingsApi = createApi({
  reducerPath: 'bookingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL
  }),
  tagTypes: ['Bookings'],
  endpoints: build => ({
    fetchBookings: build.query<IBookingFetch[], IBookingFetchParams>({
      query: ({ startTime, endTime }) => ({
        url: `/bookings`,
        params: {
          startDateTime: startTime,
          endDateTime: endTime
        }
      }),
      providesTags: results => ['Bookings'],
    }),
    createBooking: build.mutation<IBooking, IBooking>({
      query: (booking) => ({
        url: `/bookings`,
        method: 'POST',
        body: booking,
      }),
      invalidatesTags: ['Bookings'],
    }),
    updateBooking: build.mutation<IBooking, IBooking>({
      query: (booking) => ({
        url: `/bookings/item/${booking.id}`,
        method: 'PATCH',
        body: booking,
      }),
      invalidatesTags: ['Bookings'],
    }),
    deleteBooking: build.mutation<IBooking, number>({
      query: (id) => ({
        url: `/bookings/item/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookings'],
    }),
  }),
});

export const {
  useFetchBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useLazyFetchBookingsQuery
} = bookingsApi;
