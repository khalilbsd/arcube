// import { createApi } from '@reduxjs/toolkit/query/react'
import {
    createApi
  } from '@reduxjs/toolkit/query/react'
  import axios from './base'

  const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
    async ({ url, method, data, params ,headers }:{
      url: string;
      method: string;
      data?: any;
      params?: any;
      headers?: any;
    }) => {
      try {
        const requestUrl= baseUrl  + url
        const result = await axios({ url: requestUrl, method, data, params ,headers })
        return { data: result.data }
      } catch (axiosError: any) {
        let err :any = axiosError
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        }
      }
    }


  export const api = createApi({
    baseQuery: axiosBaseQuery(),
    endpoints: (_builder) => ({}),
  })