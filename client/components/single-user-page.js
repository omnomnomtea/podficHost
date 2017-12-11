import React from 'react'
import { connect } from 'react-redux'
import {SinglePodfic, AudioDownloads} from './index'
import { fetchPodficsByUser, fetchUser, clearPodfics, clearUsers } from '../store'

class SingleUserPage extends React.Component {
  constructor() {
    super()
    this.state = {
      loaded: false,
    }
  }

  loadOnce() {
    if (!this.state.loaded ) this.props.load()
    this.setState({ loaded: true })
  }

  componentDidMount() {
    this.loadOnce()
  }

  componentWillUnmount() {
    this.props.clear()
  }

  render() {
    const { podfics, user } = this.props
    if (!user || !podfics) return <div className="loading" />

    return (
      <div>
        <div className="user-bio">
          <h3>Bio:</h3>
          {user.bio}
        </div>
        <div className="user-podfics">
          {
            podfics.map(podfic => {
              return <SinglePodfic key={podfic.id} podfic={podfic} />
            })
          }
        </div>
      </div>
    )

  }

}


/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  const userId = Number(ownProps.match.params.id)

  return {
    podfics: state.podfics.filter(podfic =>
      !!podfic.users.find(user => user.id === userId) //if not found, returns undefined (falsey) and filters out this podfic from state
    ),
    user: state.users.find(user => user.id === userId)
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const userId = Number(ownProps.match.params.id)
  return {
    load() {
      dispatch(fetchPodficsByUser(userId))
      dispatch(fetchUser(userId));
    },
    clear() {
      dispatch(clearUsers())
      dispatch(clearPodfics())
    }
  }
}

export default connect(mapState, mapDispatch)(SingleUserPage)
