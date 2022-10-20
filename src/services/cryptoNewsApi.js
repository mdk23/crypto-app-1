import {createApi,fetchBaseQuery } from'@reduxjs/toolkit/query/react'

const cryptoNewsHeaders={
    'X-RapidAPI-Key': 'a6157937fcmsh27302894111a0c2p1503adjsn49557816bd02',
    'X-RapidAPI-Host': 'crypto-news-today.p.rapidapi.com'
}

const base_URL='https://crypto-news-today.p.rapidapi.com/';

const create_Request=(url)=>({url,headers:cryptoNewsHeaders});

export const cryptoNewsApi=createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery:fetchBaseQuery({
        baseUrl: base_URL
    }),
    endpoints:(builder)=>({
        getCryptoNews: builder.query({
            query:(coin)=>create_Request(`news/${coin}`)
        })
    })
});

export const {useGetCryptoNewsQuery} = cryptoNewsApi;