import React from 'react'

const AudioDownloads = (props) => {

  const { audios } = props
  return (
    <React.Fragment>
    {
      audios.map(audio => (
        <div key={audio.id}>
          {audio.title}
              <button className="download-button" onClick={() => props.handleDownload(audio)}>download {audio.fileType}</button>
        </div>
      ))
    }
    </React.Fragment>
  )
}

export default AudioDownloads
