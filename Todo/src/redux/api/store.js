// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from '../api/taskApi';
import { quoteApi } from '../api/quoteApi';

const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [quoteApi.reducerPath]: quoteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware, quoteApi.middleware),
});

export default store;
