import React from 'react'

const AudioDownloads = (props) => {

  const { audios } = props
  return (
    <React.Fragment>
      {
        audios.map(audio => (
          <div key={audio.id} className="single-audio-download">
            <h4>Version: {audio.title}</h4>
            <button className="download-button" onClick={() => props.handleDownload(audio)}>Get {audio.fileType}</button>
            <p><small><strong>Downloads: </strong> {audio.downloadCount}</small></p>
          </div>
        ))
      }
    </React.Fragment>
  )
}

export default AudioDownloads
