import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Badge, Card, CardBody, CardFooter, CardHeader, Form, ListGroupItemText, ListGroupItem, ListGroup, ListGroupItemHeading, InputGroup, Label, FormGroup, Input, Col, Row, Collapse, Fade, Button, InputGroupAddon } from 'reactstrap';
import { YajadeActionTypes } from "../../../reducers/yajadeReducer";
import axios from 'axios';
class RechercheApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appList: ["ApplicationC10","ApplicationC1","ApplicationC2","ApplicationC3"],
      collapse: false,
      query: "Any",
      fieldList: [],
      docSolr: [],
      checkboxs: [
        {
          "titleFront": "Saison",
          "title": "saison",
          "collapse": false,
          "checkbox": [
            {
              'id': 'saison',
              'name': 'printemps',
              "ref": 'printemps',
              "numFound": 0,
              'checked': false
            },
            {
              'id': 'saison',
              'name': 'automne',
              "ref": 'automne',
              "numFound": 0,
              'etat': false
            },
            {
              'id': 'saison',
              'name': 'ete',
              "ref": 'ete',
              "numFound": 0,
              'checked': false
            },
            {
              'id': 'saison',
              'name': 'hiver',
              "ref": 'hiver',
              "numFound": 0,
              'checked': false
            },
          ],
        },
        {
          "titleFront": "Client",
          "title": "client",
          "checkbox": [
            {
              'id': 'client',
              'name': 'cjue',
              "ref": 'cjue',
              "numFound": 0,
              'checked': false
            },
            {
              'id': 'client',
              'name': 'rjue',
              "ref": 'rjue',
              "numFound": 0,
              'checked': false
            },
            {
              'id': 'client',
              'name': 'sma',
              "ref": 'sma',
              "numFound": 0,
              'checked': false
            }
          ],
        },
        {
          "titleFront": "Prix",
          "title": "prix",
          "checkbox": [
            {
              'id': 'prix',
              'name': '1',
              "ref": '1',
              "numFound": 0,
              'checked': false
            },
            {
              'id': 'prix',
              'name': '5',
              "ref": '5',
              "numFound": 0,
              'checked': false
            },
          ],
        },

      ],
      docs: [],
      saison: [],
      client: [],
      prix: [],
      numFound: 0,
      checkedItems: new Map()
    }
  }
  componentDidMount() {
    let application = [];
    application = this.props.application;

  }
  handleChange = (e) => {
    const field = [{
      saison: [{}],
      client: [{}],
      prix: [{}],
    }]
    const newRequetteSolr = {
      query: this.state.query,
      checkboxs: this.state.checkboxs,
    }
    const itemName = e.target.name;
    const id = e.target.id;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(itemName, isChecked)
    }));


    console.log(`name :${e.target.name} is checked ${e.target.checked}`)

    this.state.checkboxs.map((item) => {
      if (e.target.id == item.title) {
        item.checkbox.map((itemCheck) => {
          if (itemCheck.name == e.target.name) {
            this.state.fieldList.map((itemfield) => {
              if (itemfield.field == itemName) {
                // itemCheck.numFound = itemfield.numFound;
                console.log(itemfield)
              }
            })
            itemCheck.checked = e.target.checked;
          }
          console.log(`name :${itemCheck.name} is checked ${itemCheck.checked} ${itemCheck.numFound
            }`
          )
        })
      };

    });


    const queryState = this.getQuery.value
    if (queryState != '') {
      newRequetteSolr.query = queryState;
    }
    console.log(queryState)

    axios.post('http://localhost:8081/doc', newRequetteSolr)//'http://172.17.0.1:8081/doc
      .then(res => res.data)
      .then(json => {

        field.saison = json.facet_counts.facet_fields.saison;
        field.prix = json.facet_counts.facet_fields.prix;
        field.client = json.facet_counts.facet_fields.client;
        let fieldList = []

        for (let i = 1; 2 * i - 2 <= field.client.length; i++) {
          const doc = {
            field: field.client[2 * i - 2],
            numFound: field.client[2 * i - 1],
          }
          fieldList.push(doc);
          console.log("ajout");
        }
        for (let i = 1; 2 * i - 2 <= field.prix.length; i++) {
          const doc = {
            field: field.prix[2 * i - 2],
            numFound: field.prix[2 * i - 1],
          }
          fieldList.push(doc);
          console.log("ajout");
        }
        for (let i = 1; 2 * i - 2 <= field.saison.length; i++) {
          const doc = {
            field: field.saison[2 * i - 2],
            numFound: field.saison[2 * i - 1],
          }
          fieldList.push(doc);
          console.log("ajout");
        }
        this.state.checkboxs.map((item) => {
          fieldList.map((itemfield) => {
            item.checkbox.map((itemCheck) => {
              if (itemfield.field == itemCheck.name) {
                itemCheck.numFound = itemfield.numFound;
              }
            })
          })
        })
        this.setState({ numFound: json.response.numFound });
        let docs = json.response.docs ;
 const app =this.props.listApps
        const listAppUser = []
        docs.map((app) =>{
         this.state.appList.map((item) =>{
      
            if( item == app.foreignKey){
              listAppUser.push(app)
            }
          })
        })
      //  this.setState({docs:listAppUser})
       this.setState({docs:docs})
      console.log(listAppUser)
        
        console.log(`json ${json}`)
        console.log(`json ${this.state.numFound}`)
      }
      ).catch(function (error) {
        console.log(error);
      });
    console.log(newRequetteSolr);

  }
  handleSubmit = (e) => {
    e.preventDefault();
    const field = [{
      saison: [{}],
      client: this.state.client,
      prix: this.state.prix,

    }]
    const newRequetteSolr = {
      query: this.state.query,
      checkboxs: this.state.checkboxs,
    }

    const queryState = this.getQuery.value
    if (queryState != '') {
      newRequetteSolr.query = queryState;
    }
    axios.post('http://localhost:8081/doc', newRequetteSolr)//'http://172.17.0.1:8081/doc
      .then(res => res.data)
      .then(json => {
        console.log(json)
        field.saison = json.facet_counts.facet_fields.saison;
        field.prix = json.facet_counts.facet_fields.prix;
        field.client = json.facet_counts.facet_fields.client;
        // let len = field.client.length
        // console.log(len)
        let fieldList = []

        for (let i = 1; 2 * i - 2 <= field.client.length; i++) {
          const doc = {
            field: field.client[2 * i - 2],
            numFound: field.client[2 * i - 1],
          }
          fieldList.push(doc);
          console.log("ajout");
        }
        for (let i = 1; 2 * i - 2 <= field.prix.length; i++) {
          const doc = {
            field: field.prix[2 * i - 2],
            numFound: field.prix[2 * i - 1],
          }
          fieldList.push(doc);
          console.log("ajout");
        }
        for (let i = 1; 2 * i - 2 <= field.saison.length; i++) {
          const doc = {
            field: field.saison[2 * i - 2],
            numFound: field.saison[2 * i - 1],
          }
          fieldList.push(doc);
          console.log("ajout");
        }

        this.state.checkboxs.map((item) => {
          fieldList.map((itemfield) => {
            item.checkbox.map((itemCheck) => {
              if (itemfield.field == itemCheck.name) {
                itemCheck.numFound = itemfield.numFound;
              }
            })
          })
        })

        this.setState({ numFound: json.response.numFound });
        let docs = json.response.docs ;
     
        const app =this.props.listApps
        const listAppUser = []
        docs.map((app) =>{
         this.state.appList.map((item) =>{
      
            if( item == app.foreignKey){
              listAppUser.push(app)
            }
          })
        })
      //  this.setState({docs:listAppUser})
      console.log(listAppUser)
        this.setState({ docs: docs });
        console.log(`json ${json}`)
        console.log(`json ${this.state.numFound}`)
      }
      ).catch((error) => {
        console.log(error);
      });

    // this.props.history.push('/list');
    console.log(newRequetteSolr);
    // this.getQuery.value = '';

  }
  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  render() {


    return (
      <div className="animated fadeIn">
        <div className='searchApp'>
          <Form className="form-horizontal" onSubmit={this.handleSubmit} >
            <InputGroup>
              <input placeholder="Trouver l'application" className="form-control" ref={(input) => this.getQuery = input} />
              <InputGroupAddon addonType="prepend">
                <Button color="success" className="search-button">
                  Rechercher
                      </Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </div>
        <Row>
          <Col xl="3">

            <Card>
              <CardFooter>
                <i className="fa fa-align-justify"></i><strong>  Filtrer la recherche </strong>
              </CardFooter>
            </Card>


            {this.state.checkboxs.map((item) =>
              <div>
                <CardHeader>
                  <button class="btn btn-link" type="button" onClick={this.toggle} style={{ padding: 0 }} ><div className="text-center">{item.titleFront} </div>
                  </button>
                </CardHeader>
                <Collapse isOpen={this.state.collapse}>
                  <Card>
                    <CardBody>
                      {item.checkbox.map(check =>
                        <FormGroup check>
                          <Label check>
                            <input type="checkbox" id={check.id} name={check.name} checked={this.state.checkedItems.get(check.name)} onChange={this.handleChange} ref={check.ref} />{' '}
                            {check.name}
                          </Label>
                          <div className="card-header-actions">
                            {check.numFound}
                          </div>
                        </FormGroup>
                      )}
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
            )}

          </Col>
          <Col xl="9">
            <Card>
              <CardFooter>
                <i className="fa fa-align-justify"></i>  Resultat de la recherche
                <div className="card-header-actions">
                  {this.state.numFound}
                </div>
                <div className="card-header-actions">
                </div>
              </CardFooter>
              <Row className="container listapp">
                {this.state.docs.map((dynamicData) =>
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
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    application: state.application,
    docSolr: state.docSolr,

  };
};


export default connect(
  mapStateToProps,
)(RechercheApp);




