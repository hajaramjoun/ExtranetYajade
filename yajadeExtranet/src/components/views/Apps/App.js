import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { YajadeActionTypes } from "../../../reducers/yajadeReducer";
import {
  Table,
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.validateForm()) {
      return
    }
    const titleState = this.getTitle.value;
    const lienState = this.getLien.value;
    const imageLienState = this.getImageLien.value;
    const descriptionState = this.getDescription.value;
    const saisonState = this.getSaison.value;
    const prixState = this.getPrix.value;
    const clientState = this.getClient.value;
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let registeredState = `${year}/${month} /${date}`;
    const data = {
      name: titleState,
      client: clientState,
      registered: registeredState,
      description: descriptionState,
      imageLien: imageLienState,
      prix: prixState,
      saison: saisonState,
      lien: lienState
    }
    const app = this.props.appList[this.props.match.params.id]
    const name = app.name;
    const client = app.client;
    const registered = app.registered;
    const description = app.description;
    const imageLien = app.imageLien;
    const prix = app.prix;
    const saison = app.saison;
    const lien = app.lien;
    const id = this.props.match.params.id;
    const dataSolr = {
      id: id,
      name: { name, titleState },
      client: { client, clientState },
      registered: { registered, registeredState },
      description: { description, descriptionState },
      imageLien: { imageLien, imageLienState },
      prix: { prix, prixState },
      saison: { saison, saisonState },
      lien: { lien, lienState }
    }



    console.log(data)
    this.props.dispatch({
      type: YajadeActionTypes.EditeApp,
      id: this.props.match.params.id,
      data
    });

    axios.post('http://localhost:8081/update', dataSolr)//'http://172.17.0.1:8081/doc
      .then(res => res.data)
      .catch((error) => {
        console.log(error);
      });


    this.setState({ done: true })
    this.getTitle.value = '';
    this.getLien.value = '';
    this.getImageLien.value = '';
    this.getDescription.value = '';
  }
  validateForm() {
    let formIsValid = true;
    const titleState = this.getTitle.value;
    const lienState = this.getLien.value;
    const imageLienState = this.getImageLien.value;
 
    if (titleState.trim().length == 0) {
      let formIsValid = false;
      this.setState({
        errorsTitle: 'Merci de bien  remplire le titre.'
      });
    }
    else if (titleState.trim().length !== 0) {
      this.setState({
        errorsTitle: ''
      });
    }
    if (lienState.trim().length == 0) {
      let formIsValid = false;
      this.setState({
        errorsLien: 'Merci de bien  remplire le lien.'
      });
    }
    else if (lienState.trim().length !== 0) {
      this.setState({
        errorsLien: ''
      });
    }
    if (imageLienState.trim().length == 0) {
      let formIsValid = false;
      this.setState({
        errorsImageLien: 'Merci de remplire  ce champ.'
      })
    }
    else if (imageLienState.trim().length !== 0) {

      this.setState({
        errorsImageLien: ''
      })
    }
 
    
  
    if ( titleState.trim().length != 0 && imageLienState.trim().length != 0 && lienState.trim().length != 0 ) {
      this.setState({
        errorsTitle: '',
        errorsLien: '',
        errorsImageLien: '',
     
      });
      return formIsValid
    }

  }

  render() {

    const app = this.props.appList[this.props.match.params.id]

    const appDetails = app ? Object.entries(app) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    const form = (<div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
            <Card>
              <CardHeader>
                <i className="fa fa-edit"></i>Modification de {app.name}

              </CardHeader>

              <CardBody>
                <Form className="form-horizontal" onSubmit={this.handleSubmit} >
                  <FormGroup>
                    <Label htmlFor="prependedInput">Lien</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">
                        <input id="prependedInput" className="form-control" defaultValue={app.lien} size="16" type="text" ref={(input) => this.getLien = input} />
                      </InputGroup>
                      <div className="text-danger">{this.state.errorsLien}</div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="prependedInput">Lien vers l'image</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">
                        <input id="prependedInput" className="form-control" defaultValue={app.imageLien} size="16" type="text" ref={(input) => this.getImageLien = input} />
                      </InputGroup>
                      <div className="text-danger">{this.state.errorsImageLien}</div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="appendedInput">Titre</Label>
                    <div className="controls">
                      <InputGroup>
                        <input id="appendedInput" className="form-control" defaultValue={app.name} size="16" type="text" ref={(input) => this.getTitle = input} />
                      </InputGroup>
                      <div className="text-danger">{this.state.errorsTitle}</div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="appendedInput">Client</Label>
                    <div className="controls">
                      <InputGroup>
                        <input id="appendedInput" className="form-control" defaultValue={app.client} size="16" type="text" ref={(input) => this.getClient = input} />
                      </InputGroup>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="appendedInput">Saison</Label>
                    <div className="controls">
                      <InputGroup>
                        <input id="appendedInput" className="form-control" defaultValue={app.saison} size="16" type="text" ref={(input) => this.getSaison = input} />
                      </InputGroup>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="appendedInput">Prix</Label>
                    <div className="controls">
                      <InputGroup>
                        <input id="appendedInput" className="form-control" defaultValue={app.prix} size="16" type="text" ref={(input) => this.getPrix = input} />
                      </InputGroup>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="appendedPrependedInput">Description</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">
                        <InputGroupAddon addonType="prepend">
                        </InputGroupAddon>
                        <textarea type="textarea" className="form-control textarea" defaultValue={app.description} id="textarea-input" rows="9" ref={(input) => this.getDescription = input} />
                        <InputGroupAddon addonType="append">
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </FormGroup>
                  <div className="form-actions">
                    <Button type="submit" color="primary">Sauvegarder</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Fade>
        </Col>
      </Row>
    </div>

    )
    return (
      <div>
        {this.state.done ? <Redirect to="/apps/table" /> : form}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    appList: state.appsList
  };
};

export default connect(
  mapStateToProps,
)(App);

