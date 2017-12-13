import React from 'react'
import { Link } from 'react-router-dom'

const ExtraInfo = (props) => {
  const { podfic } = props
  return (
    <div className="additional-info">
    <h4>Additional Information:</h4>
      {podfic.textUrl && <React.Fragment><a href={podfic.textUrl}>Original Text</a></React.Fragment>}
      {podfic.textAuthor && <React.Fragment> by {podfic.textAuthor}</React.Fragment>}
    </div>
  )
}

export default ExtraInfo
