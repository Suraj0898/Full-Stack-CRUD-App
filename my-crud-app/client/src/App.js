import React, { Component } from 'react';
import logo from './PERN.png';
import './App.css';
import "./bootstrap.min (1).css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "",
      item: {
        name: ""
      },
    };
}

callAPI() {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}

callDB() {
  fetch("http://localhost:9000/testDB")
      .then(response => response.json())
      .then(data => this.setState({ item: data}))
      .then(err => err);
}

componentWillMount() {
    this.callAPI();
    this.callDB();
}

render(){
  return (
    <div className="App">
      <div className="App-header">
        <p>{this.state.apiResponse}</p>
      <div className="Image">
        <img class="responsive" src={logo} alt="PERN Stack Details" />
      </div>
    </div>
    </div>
  );
}
}

export default App;
