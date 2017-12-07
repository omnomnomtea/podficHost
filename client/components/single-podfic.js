import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchPodfic} from '../store'

class SinglePodfic extends React.Component {
  constructor(){
    super()
    this.handleDownload = this.handleDownload.bind(this)
  }
  componentDidMount () {
    const { podfic } = this.props;
    if (!podfic) this.props.loadPodfic()
  }
  componentWillReceiveProps (newProps) {
    if (!this.props.podfic && !newProps.podfic) this.props.loadPodfic()
  }
  handleDownload(audio){
    window.open(audio.audioUrl)
  }

  render () {
    const {podfic} = this.props
    if (!podfic) return <div className="loading" />
    return (
      <div className="single-podfic">
        <span className="podfic-title">{podfic.title}</span> <strong>by</strong> <span className="podfic-authors">
            {podfic.users.map(user => user.username).join(', ')}
          </span>
        <div className="podfic-image">
          <img src={podfic.image || 'http://via.placeholder.com/200x200'} />
        </div>
        <div className="description">
          <strong>Description: </strong>
          {podfic.description}
        </div>
          {
            podfic.audios.map(audio=> (
              <div key={audio.key}>
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
  return {
    loadPodfic () {
      dispatch(fetchPodfic(id))
    }
  }
}

export default connect(mapState, mapDispatch)(SinglePodfic)
