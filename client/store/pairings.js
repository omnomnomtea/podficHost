import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SOME_PAIRINGS = 'GET_SOME_PAIRINGS'
const CLEAR_PAIRINGS = 'CLEAR_PAIRINGS'

/**
 * INITIAL STATE
 */
const defaultPairings = []

/**
 * ACTION CREATORS
 */
export const clearPairings = () => ({type: CLEAR_PAIRINGS})
const getSomePairings = pairings => ({type: GET_SOME_PAIRINGS, pairings})

/**
 * THUNK CREATORS
 */
export const fetchTopPairings = (numberToFetch) =>
  dispatch =>
    axios.get(`/api/users/top/${numberToFetch}`)
      .then(res => {
        if (res.data) dispatch(getSomePairings(res.data))
      })
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = defaultPairings, action) {
  switch (action.type) {
    case GET_SOME_PAIRINGS:
      return action.pairings
    case CLEAR_PAIRINGS:
      return []
    default:
      return state
  }
}
