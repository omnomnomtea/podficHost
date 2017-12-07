import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PODFIC = 'GET_PODFIC'
const GET_MANY_PODFICS = 'GET_MANY_PODFICS'
const CLEAR_PODFICS = 'CLEAR_PODFICS'

/**
 * INITIAL STATE
 */
const defaultPodfics = []
const defautPodfic = {}

/**
 * ACTION CREATORS
 */
export const clearPodfics = () => ({type: CLEAR_PODFICS})
const getPodfic = podfic => ({type: GET_PODFIC, podfic})
const getManyPodfics = podfics => ({type: GET_MANY_PODFICS, podfics})

/**
 * THUNK CREATORS
 */
export const fetchPodfic = (id) =>
  dispatch =>
    axios.get(`/api/podfics/${id}`)
      .then(res => {
        if (res.data) dispatch(getPodfic(rest.data))
      })
      .catch(err => console.log(err))

export const fetchPodficsByFandom = (fandomId) =>
  dispatch =>
    axios.get(`/api/fandoms/${fandomId}/podfics`)
      .then(res => {
        if (res.data) dispatch(getManyPodfics(res.data))
      })
      .catch(err => console.log(err))

export const fetchPodficsByUser = (userId) =>
  dispatch =>
    axios.get(`/api/users/${userId}/podfics`)
      .then(res => {
        if (res.data) dispatch(getManyPodfics(res.data))
      })
      .catch(err => console.log(err))

export const fetchPodficsByCharacter = (characterId) =>
  dispatch =>
    axios.get(`/api/characters/${characterId}/podfics`)
      .then(res => {
        if (res.data) dispatch(getManyPodfics(res.data))
      })
      .catch(err => console.log(err))

export const fetchPodficsByTag = (tagId) =>
  dispatch =>
    axios.get(`/api/tags/${tagId}/podfics`)
      .then(res => {
        if (res.data) dispatch(getManyPodfics(res.data))
      })
      .catch(err => console.log(err))

export const fetchPodficsByPairing = (pairingId) =>
  dispatch =>
    axios.get(`/api/pairings/${pairingId}/podfics`)
      .then(res => {
        if (res.data) dispatch(getManyPodfics(res.data))
      })
      .catch(err => console.log(err))

export const postNewPodfic = (podfic) =>
  dispatch =>
    axios.post(`/api/podfics`, podfic)
      .then(res => res.data)
      .then(returnedPodfic => dispatch(getPodfic(returnedPodfic)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
