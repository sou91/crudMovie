import './App.css';
import React, { Component } from 'react';
import Table from '../src/components/Table/Table';
import axios from './axios-movie';
class App extends Component {
  state={
    movieName:'',
    directorName:'',
    movieList:[]
  }
addMovie(){
    let movieObj={movieName:this.state.movieName, directorName:this.state.directorName};
    axios.post('movies.json', movieObj).then((response) => {
      this.setState({ movieName:'', directorName:'' });
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
componentDidMount(){
    let movieList=[];
    axios.get('movies.json').then(response => {
      for(var i in response.data){
        movieList.push(response.data[i]);
      }
      this.setState({ movieList:  movieList});
  }).catch(error => {
    console.log(error); 
  })
} 
  render(){
    return (
      <div className="app">
        {this.state.movieName} bb {this.state.directorName}
        <header>Movie Directory</header>
        <div className="crud-container">
        <div className='input-form'>
          <label>Movie Title</label>
          <input type='text' value={this.state.movieName} name='movieName' onChange={this.bindToState.bind(this)}/>
          <label>Movie Director</label>
          <input type='text' value={this.state.directorName} name='directorName' onChange={this.bindToState.bind(this)}/>
        </div>
        <button className='add-movie' onClick={this.addMovie.bind(this)}>Add Movie</button>
        <Table movieList={this.state.movieList}/>
      </div>
      </div>
    );
  }
  
}

export default App;
