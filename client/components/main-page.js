import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SinglePodfic, SearchBox } from './index'
import { fetchRecentPodfics, clearPodfics, fetchTopPairings } from '../store'

class MainPage extends React.Component {
  constructor() {
    super()
    this.state = {
      loaded: false
    }
  }

  loadOnce() {
    if (!this.state.loaded) this.props.load()
    this.setState({ loaded: true })
  }

  componentDidMount() {
    this.loadOnce()
  }
  componentWillUnmount() {
    this.props.clear()
  }

  componentWillReceiveProps(newProps) {
    this.loadOnce()
  }
  render() {
    const { podfics } = this.props
    if (!podfics) return <div className="loading" />
    return (
      <React.Fragment>
        <div className="main">
          <div className="content">
            {
              podfics.map(podfic => {
                return (
                  <SinglePodfic key={podfic.id} podfic={podfic} />
                )
              })
            }
            </div>
          <SearchBox />
        </div>
      </React.Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {

  return {
    podfics: state.podfics,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    load(numPerPage, pageNum) {
      numPerPage = Number(numPerPage || ownProps.match.params.numPerPage || 20)
      pageNum = Number(pageNum || ownProps.match.params.pageNum || 1)
      dispatch(fetchRecentPodfics(numPerPage, (pageNum - 1) * numPerPage))

    },
    clear: () => {dispatch(clearPodfics())}
  }
}

export default connect(mapState, mapDispatch)(MainPage)
