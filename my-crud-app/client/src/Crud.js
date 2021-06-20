import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalForm from './ModalForm.js'
import Axios from "axios";

class Crud extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        user : {
          id: "",
          first: "",
          last: "",
          email: "",
          phone: "",
          hobby: "",
        },
        users: [],
      };
}

getUsers() {
  fetch("http://localhost:9000/user")
      .then(response => response.json())
      .then(data => this.setState({ users: data}))
      .then(err => err);
}

addItemToState = (user) => {
  this.setState(prevState => ({
    users: [...prevState.users, user]
  }))
}

updateState = (user) => {
  const itemIndex = this.state.users.findIndex(data => data.id === user.id)
  const newArray = [
    ...this.state.users.slice(0, itemIndex),
    user,
    ...this.state.users.slice(itemIndex + 1)
  ]
  this.setState({ users: newArray })
}

deleteUser = user => {
  let confirmDelete = window.confirm('Delete item forever?')
  if(confirmDelete){
  Axios.delete("http://localhost:9000/user/" + user.id).then(res => {
    this.getUsers();
  });
}
};

componentWillMount() {
    this.getUsers();
}

render(){
  return (
    <div className="User-table">
    <div className="container">
    <h1>List of Users</h1>
      <table className="table striped bordered hover">
        <tr>
          <th>User Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Hobby</th>
        </tr>
        {this.state.users.map(user=>{
          return <tr key={user}>{Object.values(user).map((val)=>{
          return <td key={val}>{val}</td>})}
                <td>
                  <ModalForm buttonLabel="Edit" updateState={this.updateState}/>
                </td>
                
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.deleteUser(user);
                    }}
                  >
                    Delete
                  </button>
                </td>
            
          </tr>

        })}
      </table>
      <ModalForm buttonLabel="Add User" addItemToState={this.addItemToState}/>
      </div>
  </div> 
)
}
}

export default Crud;
