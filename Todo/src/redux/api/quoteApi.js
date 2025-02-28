import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const quoteApi = createApi({
    reducerPath: 'quoteApi',
    baseQuery: fetchBaseQuery({ baseUrl:'http://10.0.2.2:3000/' }),
    endpoints: (builder) => ({
      getRandomQuote: builder.query({
        query: () => 'quotes',
        transformResponse: (response) => response.content,
      }),
    }),
  });
  
  export const { useGetRandomQuoteQuery } = quoteApi;
