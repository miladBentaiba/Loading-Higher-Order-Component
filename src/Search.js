import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Collapse, FormGroup, Input, Label, Form } from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';

export default class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false, up: true, ratingLow: 0, ratingHigh: 10, title: "", year: null };
  }
  //update the state to match the values of the filter inputs
  filter = (e) => {
    e.target.name === 'title' ? this.setState({ title: e.target.value }, () => this.sendNewMovie()) :
      this.setState({ year: e.target.value }, () => this.sendNewMovie())
  }
  // send the added movie to the parent
  sendNewMovie = () => {
    this.props.getstatefromsearch(this.state.title, this.state.year, this.state.ratingLow, this.state.ratingHigh)
  }
  // update the state to match the value of the introduced ratings 
  // we have two values : low rate (rate1) and high rate (rate2)
  onStarClick(nextValue, prevValue, name) {
    if (name === "rate1") this.setState({ ratingLow: nextValue }, () => this.sendNewMovie());
    else this.setState({ ratingHigh: nextValue }, () => this.sendNewMovie());
  }
  // show or hide the modal
  toggle = () => { this.setState(state => ({ collapse: !state.collapse, up: !state.up }), () => this.sendNewMovie()); }

  render() {
    const { ratingLow, ratingHigh } = this.state;
    let search = (this.state.up ? <Input type="text" placeholder="Search for movies" /> : <p></p>)
    return (
      <div className="inputs" >
        <div onClick={this.toggle} className='toggler-parent'>
          {search}
          <i className={(this.state.up ? 'i fas fa-sort-down' : 'i fas fa-sort-up')}></i>
        </div>
        <Collapse isOpen={this.state.collapse}>
          <Form>
            <FormGroup>
              <Label for="exampleCheckbox float-left" >Title</Label>
              <Input type="text" name="title" id="title" placeholder="Search by title"
                onChange={(event) => { this.filter(event) }} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleCheckbox float-left">Year</Label>
              <Input type="number" name="year" defaultValue={this.state.year} id="year" placeholder="Search by year"
                onChange={(event) => { this.filter(event) }} />
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-lg-6 col-md-6 col-sm-12" for="exampleCheckbox float-left">Minimum Rating: {ratingLow}</Label>
              <StarRatingComponent className="col-lg-6 col-md-6 col-sm-12"
                name="rate1" starCount={10} value={ratingLow} onStarClick={this.onStarClick.bind(this)} />
              <Label className="col-lg-6 col-md-6 col-sm-12" for="exampleCheckbox float-left">Maximum Rating: {ratingHigh}</Label>
              <StarRatingComponent className="col-lg-6 col-md-6 col-sm-12"
                name="rate2" starCount={10} value={ratingHigh} onStarClick={this.onStarClick.bind(this)} />
            </FormGroup>
          </Form>
        </Collapse>
        <br/><br/>
      </div>);
  }
}