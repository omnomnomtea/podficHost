import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_USER = 'GET_SINGLE_USER'
const CLEAR_USERS = 'CLEAR_PODFICS'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
export const clearUsers = () => ({type: CLEAR_USERS})
const getUser = user => ({type: GET_SINGLE_USER, user})

/**
 * THUNK CREATORS
 */
export const fetchUser = (id) =>
  dispatch =>
    axios.get(`/api/users/${id}`)
      .then(res => {
        if (res.data) dispatch(getUser(res.data))
      })
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = defaultUsers, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return [...state, action.user]
    case CLEAR_USERS:
      return []
    default:
      return state
  }
}
