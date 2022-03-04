import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { connect } from "react-redux";
import { Redirect,Link} from 'react-router-dom';
import { YajadeActionTypes } from "../../../reducers/yajadeReducer";
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../../assets/img/logo-high.gif'
import sygnet from '../../../assets/img/brand/sygnet.svg'
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,DropdownItem,UncontrolledDropdown,DropdownToggle,DropdownMenu,Badge
} from "reactstrap";
import firebase from "firebase";
class DefaultHeader extends Component {
  constructor(props) {
    super(props);
   
  }
  onLogout = () => {
    
    firebase.auth().signOut().then(() => {
      this.props.dispatch({
        type: YajadeActionTypes.Logout});
      console.log("Sign-out successful")
    }).catch(function(error) {
      
      console.log("error")
    });
  }

  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/base" className="nav-link" >Tableau de bord</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem>
          
          </NavItem>
          <NavItem>
          <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav>
            <img src={'../../assets/img/avatars/hajar.jpg'} class="avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
             <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem onClick={() => this.onLogout()}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
            </UncontrolledDropdown>
          </NavItem>
        </Nav>
        {!this.props.lougout &&  <Redirect to="/login" />  }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    lougout: state.isLoged,
  };
};



export default connect(
  mapStateToProps,
)(DefaultHeader);
