import {createApi,fetchBaseQuery } from'@reduxjs/toolkit/query/react'

const cryptoApiHeaders={
    'X-RapidAPI-Key':'a6157937fcmsh27302894111a0c2p1503adjsn49557816bd02',
    'X-RapidAPI-Host':'coinranking1.p.rapidapi.com'
}

const base_URL='https://coinranking1.p.rapidapi.com/';

const create_Request=(url)=>({url,headers:cryptoApiHeaders});

export const cryptoApi= createApi({
    reducerPath: 'cryptoApi',
    baseQuery:fetchBaseQuery({
     baseUrl : base_URL
    }),
    endpoints: (builder)=>({    
        getCryptos:builder.query({
            query:(count)=>create_Request(`/coins?limit=${count}`)
        }),
        getCryptoDetails:builder.query({
            query:(coinId)=>create_Request(`/coin/${coinId}`)
        }),
        getCryptoHistory:builder.query({
            query:({coinId,timePeriod})=>create_Request(`/coin/${coinId}/history?timePeriod/${timePeriod}`)
        })
    })
});


export const {useGetCryptosQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery}=cryptoApi;


 


