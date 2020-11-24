import React from 'react'

const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
          <div className="spinner-grow text-primary mr-2" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-primary mr-2" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-primary mr-2" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-primary mr-2" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-primary mr-2" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
    )
}

export default Loading
