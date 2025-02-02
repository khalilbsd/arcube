import { api } from "./apiBase";

export const configApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getOriginalUrl: builder.mutation({
            query: ({ id }) => ({
                url: `/${id}`,
                method: "GET"
            }),
        }),
        shortenUrl: builder.mutation({
            query: (data) => ({
                url: `/shorten`,
                method: "POST",
                data
            }),
        }),
    }),
});

export const {
    useGetOriginalUrlMutation,
    useShortenUrlMutation
} = configApi;