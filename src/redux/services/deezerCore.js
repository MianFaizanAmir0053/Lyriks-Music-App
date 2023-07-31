import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const deezerApi = createApi({
    reducerPath: 'deezerApi',
 baseQuery: fetchBaseQuery({
        baseUrl: "https://shazam.p.rapidapi.com",
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '2923d9b7f2mshcffbb5f1c5c58e5p1e709ejsn00d1f491136b');
            headers.set('X-RapidAPI-Host', 'shazam.p.rapidapi.com');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getDeezer: builder.query({
            query: () => '/charts/track',
        }),
        getAroundYou: builder.query({
            query: () => `/charts/track?listId=ip-country-chart-FR&startFrom=0`,
        }),
        getSongDetails: builder.query({
            query: ({songid}) => `/songs/get-details?key=${songid}`,
        }),
        getArtistsDetails: builder.query({
            query: ({id}) => `/artists/get-details?id=${id}`,
        }),
        getArtistsTopSongs: builder.query({
            query: ({id}) => `/artists/get-top-songs?id=${id}`,
        }),
        getSongsRelated: builder.query({
            query: ({songid}) => `/songs/list-recommendations?key=${songid}`,
        }),
        getSongsBySearch: builder.query({
            query: ({searchTerm}) => `/search?term=${searchTerm}`,
        }),

    }),
});

export const {useGetDeezerQuery, useGetSongDetailsQuery, useGetSongsBySearchQuery, useGetAroundYouQuery, useGetArtistsTopSongsQuery, useGetArtistsDetailsQuery, useGetSongsRelatedQuery} = deezerApi;
