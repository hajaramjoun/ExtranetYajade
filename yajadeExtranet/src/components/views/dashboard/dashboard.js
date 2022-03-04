import React, { Component } from 'react';
import axios from 'axios';
import { HierarchicalMenuFilter } from "searchkit";
import { Badge, Card, CardBody, CardFooter, CardHeader, InputGroup, Input, Col, Row, Collapse, Fade, Form, Button, InputGroupAddon } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import { Redirect, Link } from 'react-router-dom';
import { connect } from "react-redux";
import firebase from "firebase";
import config from '../../../config';
import { YajadeActionTypes } from "../../../reducers/yajadeReducer";
class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {

      listAppUser: [],
      appList: [],

    };
  }

  componentDidMount() {
    let connect = false;
    let connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function (snap) {
      if (snap.val() === true) {
        connect = true
      }
    });
    if (connect) {
      this.props.dispatch({
        type: YajadeActionTypes.UpdateApp
      })
    }
  /*const   userList=this.props.userList
    var user = firebase.auth().currentUser;
    if (user != null) {
      user.providerData.forEach(function (profile) {
        userList.map((item) => {
          if (item.email === profile.email) {
         this.setState({appList:item.applications})
          }
        })
        
      });
    }
    const app =this.props.listApps
    const listAppUser = []
    app.map((app) =>{
     this.state.appList.map((item) =>{

        if( item == app.foreignKey){
          listAppUser.push(app)
        }
      })
    })
     this.setState({listAppUser:listAppUser})
    console.log(listAppUser)*/
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className='searchApp'>
          <Form className="form-horizontal" onSubmit={this.handleSubmit} >
            <InputGroup>
              <input placeholder="Trouver l'application" className="form-control" ref={(input) => this.getQuery = input} />
              <InputGroupAddon addonType="prepend">
                <Link to={'/apps/recherche'}> <Button color="success" className="search-button">
                  +
                      </Button>
                </Link>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </div>

        {/* {this.state.listAppUser? <Row className="content"> {this.state.listAppUser.map((dynamicData) => */}
        {this.props.listApps ? <Row className="content"> {this.props.listApps.map((dynamicData) =>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardBody>
                <div className="icon"><img alt="avatar" style={{ width: '40px' }} src={dynamicData.imageLien} /></div>
                <div class="title">
                  <h4>{dynamicData.nom}</h4>
                </div>
                <div>
                  <a href={dynamicData.lien}>Learn More</a>
                </div>
              </CardBody>
            </Card>
          </Col>
        )}
        </Row>

          : <h1> aucune résultat
          </h1>}



      </div>


    );
  }
}


const mapStateToProps = state => {
  return {

    listApps: state.appsList,
    userList: state.userList,
    erreur401: state.erreur401

  };
};



export default connect(
  mapStateToProps,
)(Cards);


// export default connect()(Cards);


