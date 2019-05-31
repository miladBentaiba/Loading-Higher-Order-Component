import React, { Component } from 'react'
import './LoadeHOC.css'

const LoaderHOC = (WrappedComponent) => {
  return class LoaderHOC extends Component {
    render() { 
      return this.props.movies.length===0 ? <div className="loader"></div> : <WrappedComponent {...this.props} />
    }
  }
}
export default LoaderHOC;