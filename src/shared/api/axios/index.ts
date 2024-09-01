import { API_URL } from '..'
import axios from 'axios'

export const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})
