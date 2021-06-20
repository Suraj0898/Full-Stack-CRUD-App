import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Axios from 'axios';

class AddEditForm extends Component {
  state = {
    id: '',
    first: '',
    last: '',
    email: '',
    phone: '',
    hobby: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:9000/user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,  
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        phone: this.state.phone,
        hobby: this.state.hobby
      })
    })
      .then(response => {
          response.json()
        })
      .then(user => {
        if(Array.isArray(user)) {
          this.props.addItemToState(user[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:9000/user/' + this.state.id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        phone: this.state.phone,
        hobby: this.state.hobby
      })
    })
      .then(response => response.json())
      .then(user => {
        if(Array.isArray(user)) {
          // console.log(item[0])
          this.props.updateState(user[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.user){
      const { id, first, last, email, phone, hobby } = this.props.user
      this.setState({ id, first, last, email, phone, hobby })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.user ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="id">User Id</Label>
          <Input type="number" name="id" id="id" onChange={this.onChange} value={this.state.id === null ? '' : this.state.id} />
        </FormGroup>
        <FormGroup>
          <Label for="first">First Name</Label>
          <Input type="text" name="first" id="first" onChange={this.onChange} value={this.state.first === null ? '' : this.state.first} />
        </FormGroup>
        <FormGroup>
          <Label for="last">Last Name</Label>
          <Input type="text" name="last" id="last" onChange={this.onChange} value={this.state.last === null ? '' : this.state.last}  />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input type="text" name="phone" id="phone" onChange={this.onChange} value={this.state.phone === null ? '' : this.state.phone}  placeholder="ex. 555-555-5555" />
        </FormGroup>
        <FormGroup>
          <Label for="hobby">Hobby</Label>
          <Input type="text" name="hobby" id="hobby" onChange={this.onChange} value={this.state.hobby}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm