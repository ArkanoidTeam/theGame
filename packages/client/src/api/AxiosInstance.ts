import axios from 'axios'
import { BASE_API_URI } from '../utils/constants/api'

export const axiosInstance = axios.create({
  baseURL: `${BASE_API_URI}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
