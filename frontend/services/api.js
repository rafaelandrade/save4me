import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    authorization:
      '0449f26a266df07cf3bb8afa5c9a19934985cc0336ca13f77be88a75a804dc280953bcae4f566b35970d0d1f3329af712f00b50cfa7a5ac156bbb409f16b4829',
  },
})

export const getLinks = async ({ email }) => {
  try {
    const { data } = await api.post('/v1/saveforme/', { email })

    return data
  } catch (error) {
    console.log(error)

    return {}
  }
}

export const postLinks = async ({ email, data, service = 'create' }) => {
  try {
    const { data: response } = await api.post('/v1/saveforme/', { email, data, service })

    return response
  } catch (error) {
    console.log(error)

    return {}
  }
}

export const deleteLinks = async ({ email, data, service = 'remove' }) => {
  try {
    const { data: response } = await api.post('/v1/saveforme/', { email, data, service })

    return response
  } catch (error) {
    console.log(error)

    return {}
  }
}

export const updateLinks = async ({ email, data, service = 'update' }) => {
  try {
    const { data: response } = await api.post('/v1/saveforme/', { email, data, service })

    return response
  } catch (error) {
    console.log(error)
  }
}
