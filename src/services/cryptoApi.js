import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '62ea1fa1c3msh069f24d572415bbp1ff38fjsn513411691393'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCoinDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCoinHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timePeriod=${timeperiod} `)
        })
    })
})

export const { useGetCryptosQuery, useGetCoinDetailsQuery, useGetCoinHistoryQuery } = cryptoApi;