import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link ,Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon,  InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import firebase from "firebase";
import { YajadeActionTypes } from "../../../reducers/yajadeReducer";
class Login extends Component {

  constructor(props) {
    super(props);

    const stateinit = {
      
     

    };
    this.state = stateinit
    console.log(this.props.loggedIn)
  }


  onSubmit = (e) => {
    e.preventDefault();
    const nameState = this.getName.value;
    const passwordState = this.getPassword.value;
    if (!this.validateForm()) { return }
  

    firebase.auth().signInWithEmailAndPassword(nameState, passwordState).then(response => {
          console.log('login response: ')
          console.log(response)     
          this.props.dispatch({
                  type: YajadeActionTypes.FormValidate
                })
              
           
          // console.log("login")
  
        }).catch(function(error) {
      
      console.log('this.props.erreur400')
    });
   
       const date = {
      name: nameState,
      password: passwordState
    }

  }





  validateForm() {
    let formIsValid = true;
    const nameState = this.getName.value;
    const passwordState = this.getPassword.value;
    if (nameState.trim().length == 0) {
      let formIsValid = false;
      this.setState({
        errorsUsername: 'Merci de bien  remplire ce champs.'
      });

      console.log("hellow")
    }
    else if (nameState.trim().length !== 0) {
      this.setState({
        errorsUsername: ''
      });
    }
    if (passwordState.trim().length == 0) {
      let formIsValid = false;
      this.setState({
        errorsPassword: 'Merci de remplire  le password.'
      });

    }
    else if (passwordState.trim().length !== 0) {

      this.setState({
        errorsPassword: ''
      })
    };
    if (passwordState.trim().length != 0 && nameState.trim().length != 0) {
      this.setState({
        errorsUsername: '',
        errorsPassword: '',
      })
     
      return formIsValid


    }

  }



  render() {

    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">

          <div className="fadeIn first">
            <img src="../../../assets/logo-sans-yajade.png" id="icon" alt="User Icon" />
          </div>

          <form onSubmit={this.onSubmit} >
            <input type="text" id="login" className="fadeIn second" name="username" placeholder="login"  ref={(input) => this.getName = input}
            />
            <div className="errorMsg">{this.state.errorsUsername}</div>
            <input type="text" id="password" className="fadeIn third" name="password" placeholder="password"  ref={(input) => this.getPassword = input} />

            <div className="errorMsg">{this.state.errorsPassword}</div>
              <input type="submit" className="fadeIn fourth" defaultValue="Log In" />
            
          </form>

          <div id="formFooter">
            <label htmlFor="remember-me" className="text-info"><span>Remember me</span>&nbsp;<span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br />
          </div>
        </div>
    {  this.props.loggedIn  &&  <Redirect to="/dashboard" />  }
        {/* <Redirect to="/404" />  */}
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.isLoged,
    // erreur401: state.erreur401

  };
};


export default connect(
  mapStateToProps,
)(Login);