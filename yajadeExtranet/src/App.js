import React, { Component } from 'react';
import { HashRouter, Route, BrowserRouter, Switch , Redirect } from 'react-router-dom';
import Login from './components/views/Pages/Login'
import Page404 from './components/views/Pages/Page404/Page404'
import Page500 from './components/views/Pages/Page500/Page500'
import { connect } from "react-redux";
import { YajadeActionTypes } from "./reducers/yajadeReducer";
import yajadeReducer from "./reducers/yajadeReducer";
import DefaultLayout from './components/containers/DefaultLayout/DefaultLayout'
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import firebase from "firebase";
import config from './config';
import {loadState,saveState }from './localStorage'
import { createStore } from 'redux';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {
  constructor(props) {
    
    super(props);
    
  
  }
  componentDidMount() {
 
  
  //    admin.auth().getUser(uid)
  // .then(function(userRecord) {
  //   // See the UserRecord reference doc for the contents of userRecord.
  //   console.log('Successfully fetched user data:', userRecord.toJSON());
  // })
  // .catch(function(error) {
  //   console.log('Error fetching user data:', error);
  // });
  
    

}  

  
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            {/* {!this.props.loggedIn  && */}
               {/* <Route exact path="/login" name="Login Page" component={Login} /> */}
              //  }
            <Route exact path="/login" name="Login Page" component={Login} />
             <Route path="/" name="Home" component={DefaultLayout} /> 
            {this.props.loggedIn ?     <Route path="/" name="Home" component={DefaultLayout} /> : <Redirect to="/login" /> }
            {/* {(this.props.erreur401) ?     <Route exact path="/404" name="Login Page" component={Login} /> : <Redirect to="/404" /> } */}
            {/* {(!this.props.loggedIn && this.props.erreur401) && <Route exact path="/404" component={Page404} />} */}
         
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    erreur401: state.erreur401,
    listApps: state.appsList,
    userList: state.userList
  };
};



export default connect(
  mapStateToProps,
)(App);

