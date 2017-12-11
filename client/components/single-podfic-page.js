import React from 'react'
import { connect } from 'react-redux'
import {SinglePodfic, AudioDownloads} from './index'
import { fetchPodfic } from '../store'

class SinglePodficPage extends React.Component {
  constructor() {
    super()
    this.state = {
      loaded: false
    }
    this.handleDownload = this.handleDownload.bind(this)
  }
  loadOnce() {
    if (!this.state.loaded ) this.props.loadPodfic()
    this.setState({ loaded: true })
  }

  handleDownload(audio) {
    // NOTE: later, add to the download count
    window.open(audio, '_blank');
  }

  componentDidMount() {
    this.loadOnce()
  }

  render() {
    const { podfic } = this.props
    if (!podfic || !podfic.audios) return <div className="loading" />
    return (
      <div className="main">
        <div className="content">
          <SinglePodfic podfic={podfic} />
        </div>
        <div className="audiofile-area">
          <AudioDownloads audios={podfic.audios} handleDownload={this.handleDownload} />
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)

  return {
    podfic: state.podfics.find(podfic => podfic.id === id),
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const id = Number(ownProps.match.params.id)
  return {
    loadPodfic() {
      console.log('loading podfic')
      dispatch(fetchPodfic(id))
    }
  }
}

export default connect(mapState, mapDispatch)(SinglePodficPage)
