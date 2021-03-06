import axios from 'axios'
import * as Sentry from '@sentry/nextjs'
import './sentry'
import axiosConfig from '../config/api.json'

const api = axios.create(axiosConfig)

const fetchBackend = async ({ email, data, service = 'get' }) => {
  try {
    const { data: response } = await api.post('/v1/saveforme/', { email, data, service })

    return response
  } catch (error) {
    Sentry.captureException(error)

    return {}
  }
}

const fetchLogin = async ({ email, password }) => {
  try {
    const { data: response } = await api.post('/v1/saveforme/login', { email, password })

    return response
  } catch (error) {
    Sentry.captureException(error)

    throw error
  }
}

export { fetchBackend, fetchLogin }
