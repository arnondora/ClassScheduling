import React, { Component } from 'react';
import fordFulkerson from './utils/fordFulkerson'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
      var graph = [
  	[
  		0, 2, 1, 0, 0, 0
  	], [
  		0, 0, 0, 1, 1, 0
  	], [
  		0, 0, 0, 0, 1, 0
  	], [
  		0, 0, 0, 0, 0, 1
  	], [
  		0, 0, 0, 0, 0, 2
  	], [
  		0, 0, 0, 0, 0, 0
  	]
  ]
  console.log("The maximum possible flow is " +
  	fordFulkerson(graph, 0, 5))

    console.log("Hello")

    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
