import React, { Component } from 'react'
import MovieCard from './MovieCard'
import LoaderHOC from './LoaderHOC'

class List extends Component {
  render() { 
    return this.props.movies.map((el, index) => <MovieCard item={el} key={index} />)
  }
}

export default LoaderHOC(List)