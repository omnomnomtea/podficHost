import React from 'react'
import { Link } from 'react-router-dom'

const ExtraInfo = (props) => {
  const { podfic } = props
  return (
    <div>
      <Link to={podfic.textUrl}>Original Text</Link> by {podfic.textAuthor}
    </div>
  )
}

export default ExtraInfo
