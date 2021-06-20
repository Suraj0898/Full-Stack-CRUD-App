import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class DBLink extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      item: {
        name: ""
      },
    };
}

callDB() {
  fetch("http://localhost:9000/testDB")
      .then(response => response.json())
      .then(data => this.setState({ item: data}))
      .then(err => err);
}

componentWillMount() {
    this.callDB();
}

render(){
  return (
    <div className="App">
      <div className="App-header">
      <p>Connection Established with {this.state.item.name} Postgres DB!</p>
      </div>
    </div>
  );
}
}

export default DBLink;
