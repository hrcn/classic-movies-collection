import React, { Component } from 'react'
import e from 'express';

class RegisterLogin extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col 12" onSubmit={event => this.submitForm(event)}>
            
          </form>
        </div>
        Login Page
      </div>
    )
  }
}

export default RegisterLogin;
