import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {usersApi} from '@Store/users';
import {bookingsApi} from '@Store/bookings';
import {typesApi} from '@Store/types';
import { dateReducer } from '@Store/date/dateSlice';



export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [bookingsApi.reducerPath]: bookingsApi.reducer,
        [typesApi.reducerPath]: typesApi.reducer,
        date: dateReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
        usersApi.middleware, bookingsApi.middleware, typesApi.middleware
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
