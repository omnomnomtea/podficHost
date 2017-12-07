import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// helper functions
const handleDownload = (audio) => {
  window.open(audio.audioUrl)
}
// main function
const SinglePodfic = (props) => {
  const { podfic } = props
  if (!podfic) return <div className="loading" />
  return (
    <div className="single-podfic-container">
      <div className="podfic-title">
        <Link to={`/podfics/${podfic.id}`}>{podfic.title}</Link>
        <strong> by </strong> <span className="podfic-authors">
          {podfic.users.map(user => user.username).join(', ') || 'Orphan Account'}
        </span>
      </div>
      <div className="podfic-image">
        <img src={podfic.image || 'http://via.placeholder.com/175x175'} />
      </div>
      <div className="podfic-description">
        <strong>Description: </strong>
        {podfic.description}
        {
          podfic.audios.map(audio => (
            <div key={audio.id}>
              {audio.title} ({audio.fileType})
              <button className="download-button" onClick={() => handleDownload(audio)}>download</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}


/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return {
    podfic: ownProps.podfic,
  }
}


const mapDispatch = (dispatch, ownProps) => {
  return {}
}

export default connect(mapState, mapDispatch)(SinglePodfic)
