import axios from 'axios'

export const axiosInstance = (
  baseURL: string,
  headers: Record<string, string>,
  withCredentials?: boolean
) =>
  axios.create({
    baseURL,
    headers,
    withCredentials,
  })
