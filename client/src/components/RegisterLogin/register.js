import React, { Component } from 'react'
import { registerUser } from '../../actions/user_actions'

class Register extends Component {
  state = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: []
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  isFormEmpty = ({ name, lastname, email, password, passwordConfirmation }) => {
    return (
      !name.length ||
      !lastname.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  }

  isPasswordValid = ({ password, passwordConfirmation }) => {
    // password length should be greater than 6
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  }

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Please fill in all fileds" };
      this.setState({ errors: errors.concat(error) });
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password not mathcing" }
      this.setState({ errors: errors.concat(error) })
    } else {
      return true;
    }
  }

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = {
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation
    }

    if (this.isFormValid()) {
      this.setState({ errors: [] })
      this.props.dispatch(registerUser(dataToSubmit))
        .then(response => {
          console.log(response);
          if (response.payload.success) {
            this.props.history.push('/login');
          } else {
            this.setState({
              errors: this.state.errors.concat("Your attempt to send data to database was failed")
            })
          }
        })
        .catch(err => {
          this.setState({
            errors: this.state.errors.concat(err)
          })
        })
    } else {
      console.error("Form is not valid");
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Sign Up</h2>
        <div className="row">
          <form className="col s12" onSubmit={event => this.submitForm(event)}>
            {/* Enter first name */}
            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  name="name"
                  value={this.state.name}
                  onChange={e => this.handleChange(e)}
                  id="name"
                  type="text"
                />
                <label className="active" htmlFor="email">First Name</label>
                <span
                  className="helper-text"
                  data-error="Wrong password"
                  data-success="Correct password"
                />
              </div>
            </div>
            {/* Enter last name */}
            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={e => this.handleChange(e)}
                  id="lastname"
                  type="text"
                />
                <label className="active" htmlFor="email">Last Name</label>
                <span
                  className="helper-text"
                  data-error="Enter the correct email"
                  data-success="Correct email format"
                />
              </div>
            </div>
            {/* Enter email */}
            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  name="email"
                  value={this.state.email}
                  onChange={e => this.handleChange(e)}
                  id="email"
                  type="text"
                />
                <label className="active" htmlFor="email">Email Address</label>
                <span
                  className="helper-text"
                  data-error="Wrong password"
                  data-success="Correct password"
                />
              </div>
            </div>
            {/* Enter password */}
            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  name="password"
                  value={this.state.password}
                  onChange={e => this.handleChange(e)}
                  id="password"
                  type="text"
                />
                <label className="active" htmlFor="password">Password</label>
              </div>
            </div>
            {/* Confirm password */}
            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  name="email"
                  value={this.state.password}
                  onChange={e => this.handleChange(e)}
                  id="email"
                  type="text"
                />
                <label className="active" htmlFor="email">Password Confirmation</label>
              </div>
            </div>
            {/* Handle errors */}
            {this.state.errors.length > 0 && (
              <div>
                {this.displayErrors(this.state.errors)}
              </div>
            )}
            {/* Create account button */}
            <div className="row">
              <div className="col s6">
                <button 
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                  onClick={this.submitForm}
                >
                  Create an account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Register
