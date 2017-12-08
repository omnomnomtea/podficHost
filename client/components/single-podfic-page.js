import React from 'react'
import { connect } from 'react-redux'
import SinglePodfic from './single-podfic'
import { fetchPodfic } from '../store'

class SinglePodficPage extends React.Component {
  constructor() {
    super()
    this.state = {
      loaded: false
    }
  }
  loadOnce() {
    if (!this.state.loaded) this.props.loadPodfic()
    this.setState({ loaded: true })
  }

  handleDownload(audio) {
    // NOTE: later, add to download count
    window.open(audio, '_blank');
  }

  componentDidMount() {
    this.loadOnce()
  }
  componentWillReceiveProps() {
    this.loadOnce()
  }
  render() {
    const { podfic } = this.props
    if (!podfic) return <div className="loading" />
    return (
      <div className="main">
        <SinglePodfic podfic={podfic} />
        {
          podfic.audios.map(audio => (
            <div key={audio.id}>
              {audio.title} ({audio.fileType})
                <button className="download-button" onClick={() => this.handleDownload(audio)}>download</button>
            </div>
          ))
        }
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
  console.log('id:', id)
  return {
    loadPodfic() {
      dispatch(fetchPodfic(id))
    }
  }
}

export default connect(mapState, mapDispatch)(SinglePodficPage)
