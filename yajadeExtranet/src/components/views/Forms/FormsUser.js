import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import firebase from "firebase";
import newId from '../utils/newid';
import { YajadeActionTypes } from "../../../reducers/yajadeReducer";
import { connect } from 'react-redux';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

class FormsUser extends Component {
  constructor(props) {
    super(props);
    checkedItems: new Map();

    this.state = {
      fields: [],
      done: false
    };
  }
  

  handleChange = (e) => {

    e = e.target.value;
    this.setState(prevState => ({
      items: prevState.fields.push(e)
    }));
    

  }


  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.validateForm()) {

      return
    }
    const nameState = this.getName.value;
    const prenomStae = this.getPrenom.value;
    const roleState = this.getRole.value;
    const emailState = this.getEmail.value;
    const passwordState = this.getPassword.value;
    const imageState = this.getImage.value;
    const applicationState = this.state.fields;
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let uid = this.uuidv4();

    const data = {
      uid: uid,
      name: nameState,
      prenom: prenomStae,
      image: imageState,
      applications: applicationState,
      registered: `${year}/${month} /${date}`,
      role: roleState,
      email: emailState,
   
    }
   
    
     const authData = {
       uid,
       nameState,
       imageState,
      emailState,
      passwordState,
    }
    
    axios.post('http://localhost:8081/addUser',authData)//'http://172.17.0.1:8081/doc
    .then(res => {
 
      console.log(res.data.code);
      console.log(res.data);

   
  res.status === 200 ? 
     this.props.dispatch({
      type: YajadeActionTypes.AddUser,
      data
    })&&
    this.setState({ done: true })
 :  res.data.code.includes("email")? this.setState({
        errorsEmail: res.data.message
      }) : this.setState({
        errorsPassword: res.data.message
      })
    
  
    }
  )

    

      }
      uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
      
     
      
  handleRemove = (i) => {
    console.log(this.state.fields)
    console.log(this.state.fields[0])
    console.log(this.state.fields[i])
    this.setState(prevState => ({ item: prevState.fields.splice(i, 1) }));
  };

  componentDidMount() {
    axios.get('http://localhost:8081/docs')//'http://172.17.0.1:8081/doc
      .then(res => res.data)

  }

  validateForm() {
    let formIsValid = true;

    const nameState = this.getName.value;
    const prenomState = this.getPrenom.value;
    const emailState = this.getEmail.value;
    const passwordState = this.getPassword.value;
    const roleState = this.getRole.value;
    if (nameState.trim().length == 0) {
      let formIsValid = false;
      this.setState({
        errorsName: 'Le champ " Nom" est obligatoire'
      });
    }
    else if (nameState.trim().length !== 0) {
      this.setState({
        errorsName: ''
      });
    }
    if (prenomState.trim().length == 0) {
      let formIsValid = false;
      this.setState({
        errorsPrenom: 'Le champ " Prenom" est obligatoire'
      });
    }
    else if (prenomState.trim().length !== 0) {
      this.setState({
        errorsPrenom: ''
      });
    }
    if (passwordState.trim().length == 0) {
      let formIsValid = false;
      this.setState({
        errorsPassword: 'Le champ " Mot de passe" est obligatoire'
      })
    }
    else if (passwordState.trim().length !== 0) {

      this.setState({
        errorsPassword: ''
      })
    }
    if (roleState.trim().length == 0) {
      let formIsValid = false;
      this.setState({
        errorsRole: 'Le champ "Rôle" est obligatoire'
      })
    }
    else if (passwordState.trim().length !== 0) {

      this.setState({
        errorsPassword: ''
      })
    }

    if (emailState.trim().length == 0) {
      let formIsValid = false;
      this.setState({
        errorsEmail: 'Le champ "E-mail" est obligatoire'
      });

    }
    else if (emailState.trim().length !== 0 && emailState.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({
        errorsEmail: ''
      });

    }
    if (prenomState.trim().length != 0 && nameState.trim().length != 0 && roleState.trim().length != 0 && emailState.trim().length != 0 && passwordState.trim().length != 0) {
      this.setState({
        errorsName: '',
        errorsEmail: '',
        errorsPrenom: '',
        errorsRole: '',
        errorsPassword: '',
      });
      return formIsValid
    }

  }


  render() {
    const form = (<div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
            <Card>
              <CardHeader>
                <i className="fa fa-edit"></i>Nouveau Utilisateur
            </CardHeader>
              <CardBody>
                <Form className="form-horizontal" onSubmit={this.handleSubmit} >
                  <FormGroup>
                    <Label htmlFor="prependedInput">Nom*</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">
                        <InputGroupAddon addonType="prepend">
                        </InputGroupAddon>
                        <input id="prependedInput" className="form-control" size="16" type="text" ref={(input) => this.getName = input} />
                      </InputGroup>
                      <div className="text-danger">{this.state.errorsName}</div>

                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="prependedInput">Prénom*</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">
                        <InputGroupAddon addonType="prepend">
                        </InputGroupAddon>
                        <input id="prependedInput" className="form-control" size="24" type="text" ref={(input) => this.getPrenom = input} />
                      </InputGroup>
                      <div className="text-danger">{this.state.errorsPrenom}</div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="prependedInput">Adresse email*</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">
                        <input className="form-control" id="prependedInput" size="16" type="text" ref={(input) => this.getEmail = input} />
                      </InputGroup>
                      <div className="text-danger">{this.state.errorsEmail}</div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="prependedInput">Mot de passe*</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">

                        <input className="form-control" id="prependedInput" size="16" type="text" ref={(input) => this.getPassword = input} />
                      </InputGroup>
                      <div className="text-danger">{this.state.errorsPassword}</div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="prependedInput">image</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">

                        <input className="form-control" id="prependedInput" size="16" type="text" ref={(input) => this.getImage = input} />
                      </InputGroup>
                     
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="prependedInput">Applications</Label>
                    {this.props.listApps ? <select className="form-control select" defaultValue='Select' onChange={this.handleChange}>


                      {this.props.listApps.map((app) => <option>{app.foreignKey}</option>)}
                    </select> : <select className="form-control select" defaultValue='Select' onChange={this.handleChange}>
                        <option> aucune résultat </option>
                      </select>
                    }
                    <InputGroup className="input-prepend">
                      {this.state.fields.map((field, key) =>
                        <div key={`${field}-${key}`}>
                          <input className="form-control" id={`${field}-${key}`} defaultValue={field} size="16" type="text" ref={(input) => this.getApplication = input} />
                          <button type="button" onClick={() => { this.handleRemove(key) }}>
                            X
                              </button>
                        </div>
                      )}
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="appendedInput">Rôle</Label>
                    <div className="controls">
                      <InputGroup>
                        <input id="appendedInput" className="form-control" size="16" type="text" ref={(input) => this.getRole = input} />
                      </InputGroup>
                      <div className="text-danger">{this.state.errorsRole}</div>
                    </div>
                  </FormGroup>
                  <div className="form-actions">
                    <Button type="submit" color="primary">Ajouter</Button>
                  </div>

                </Form>

              </CardBody>
            </Card>
          </Fade>
        </Col>
      </Row>
    </div>)
    return (
      <div>

        {this.state.done ? <Redirect to="/users/table" /> : form}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    application: state.application,
    listApps: state.appsList,
    userList: state.userList


  };
};

export default connect(
  mapStateToProps,
)(FormsUser);
