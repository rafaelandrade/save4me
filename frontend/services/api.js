import axios from 'axios'
import * as Sentry from '@sentry/nextjs'
import './sentry'

const api = axios.create({
  baseURL: 'https://save4me-backend.herokuapp.com/',
  headers: {
    authorization:
      '0449f26a266df07cf3bb8afa5c9a19934985cc0336ca13f77be88a75a804dc280953bcae4f566b35970d0d1f3329af712f00b50cfa7a5ac156bbb409f16b4829',
  },
})

const fetchBackend = async ({ email, data, service = 'get' }) => {
  try {
    const { data: response } = await api.post('/v1/saveforme/', { email, data, service })

    return response
  } catch (error) {
    Sentry.captureException(error)

    return {}
  }
}

export default fetchBackend
