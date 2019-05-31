import React from 'react';
import './App.css';
import Search from './Search'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import AddMovie from './AddMovie'
import dataMovies from './dataMovies'
import List from './List'
// import LoaderHOC from './LoaderHOC'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] }
    library.add(fab)
  }
  //get the values filled in the inputs for filter
  getstatefromsearch = (title, year, lowRate, highRate) => {
    this.setState({ movies: this.filterMovies(title, year, lowRate, highRate) })
  }
  //get the new movie to add
  getnewmovie = (title, year, ranking, description, image) => {
   this.setState({ movies: dataMovies.concat([{ title, year, image, ranking, description }]) })
  }
  //filter the list of movies by title, year, lowRate, highRate
  filterMovies = (title, year, lowRate, highRate) => {
    return dataMovies
      .filter((el) => el.title.toLowerCase().includes(title.toLowerCase()))
      .filter((el) => { return !Boolean(year) ? true : parseInt(year) === parseInt(el.year) })
      .filter((el) => (el.ranking >= lowRate))
      .filter((el) => (el.ranking <= highRate))
  }
  componentDidMount=()=>{
    setTimeout(() =>{
      this.setState({movies: dataMovies})
    }, 3000);
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <Search getstatefromsearch={this.getstatefromsearch} />
          <div className="parent-movies">
            <List movies={this.state.movies}/>
            <AddMovie getnewmovie={this.getnewmovie} />
          </div>
        </div>
      </div>
    );
  }
}