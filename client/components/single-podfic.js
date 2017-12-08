import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// main function
const SinglePodfic = (props) => {
  const { podfic } = props
  if (!podfic) return <div className="loading" />
  return (
    <div className="single-podfic-container">
      <div className="podfic-title">
        <h3><Link to={`/podfics/${podfic.id}`}>{podfic.title}</Link> </h3>
        <span className="podfic-authors">
          by {podfic.users.map(user => user.username).join(', ') || 'Orphan Account'}
        </span>
      </div>
      <div className="podfic-image">
        <img src={podfic.image || 'http://via.placeholder.com/175x175'} />
      </div>
      <div className="podfic-description">
        <strong>Description: </strong>
        {podfic.description}
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


const mapDispatch = () => {
  return {}
}

export default connect(mapState, mapDispatch)(SinglePodfic)
