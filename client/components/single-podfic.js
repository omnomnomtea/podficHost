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
          by {podfic.users.map(user =>
            <Link key={user.id} to={`/users/${user.id}`}>{user.username} </Link>
          )}
        </span>
      </div>
      <div className="podfic-image">
        <img src={podfic.image || 'http://via.placeholder.com/175x175'} />
      </div>
      <div className="podfic-tags">
        <strong>Tags: </strong>
          {
            podfic.tags.map(tag => {
              return <Link key={tag.id} to={`/tags/${tag.id}`}>{tag.name}, </Link>
            })
        }
      </div>
      <div className="podfic-description" >
        <strong>Summary: </strong>
        <div dangerouslySetInnerHTML={ {__html: podfic.description} } />
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
