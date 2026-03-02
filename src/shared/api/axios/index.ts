import axios from 'axios'

import { API_URL } from '..'

export const API = axios.create({
  baseURL: API_URL,
})
