import './App.css';
import React, { Component } from 'react';
import Table from '../src/components/Table/Table';
import axios from './axios-movie';
import { connect } from 'react-redux';
import * as actions from './actions';
class App extends Component {
  state={
    movieName:'',
    directorName:'',
    showTable:false
  }
addMovie(){
    let movieObj={movieName:this.state.movieName, directorName:this.state.directorName};
    axios.post('movies.json', movieObj).then((response) => {
      let movieList=[...this.props.data.movieList];
      movieList.push(movieObj);
      this.setState({ movieName:'', directorName:''});
      this.props.setdata({movieList:movieList});
  }).catch(error =>{
      console.log(error);
  })
}
bindToState(event){
  let name = event.target.name;
  let value = event.target.value;
  let obj={};
  obj[name]=value;
  this.setState(obj);
}
saveMovie(){
  axios.delete('movies.json').then(response => {
    for(var i in this.props.data.movieList){
      axios.post('movies.json', this.props.data.movieList[i]).then((response2) => {
        alert('yay');
    }).catch(error =>{
        console.log(error);
    })
    }
}).catch(error => {
  console.log(error); 
})
}
componentDidMount(){
    let movieList=[];
    axios.get('movies.json').then(response => {
      for(var i in response.data){
        response.data[i].isEditable=false;
        movieList.push(response.data[i]);
      }
      //this.setState({ movieList:  movieList});
      this.props.setdata({movieList:movieList});
      this.setState({ showTable:  true});
  }).catch(error => {
    console.log(error); 
  })
} 
  render(){
    return (
      <div className="app">
        <header>Movie Directory</header>
        <div className="crud-container">
        <div className='input-form'>
          <label>Movie Title</label>
          <input type='text' value={this.state.movieName} name='movieName' onChange={this.bindToState.bind(this)}/>
          <label>Movie Director</label>
          <input type='text' value={this.state.directorName} name='directorName' onChange={this.bindToState.bind(this)}/>
          <button className='save-movie' onClick={this.saveMovie.bind(this)}>Save Changes</button>
        </div>
        <button className='add-movie' onClick={this.addMovie.bind(this)}>Add Movie</button>
        {this.state.showTable?
        <Table/>
        :null}
        
      </div>
      </div>
    );
  }
  
}

const mapStateToProps  = (store) => {
  return {
      data: store.data,
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
      setdata: (data) => dispatch(actions.setdata(data))
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(App);
