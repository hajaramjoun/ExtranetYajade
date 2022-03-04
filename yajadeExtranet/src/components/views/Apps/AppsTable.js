import React, { Component } from 'react';
import { Badge, Card, CardBody, Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import { YajadeActionTypes } from "../../../reducers/yajadeReducer";
import { Link } from 'react-router-dom';
import axios from 'axios';
import firebase from "firebase";

import config from '../../../config';
class AppsTable extends Component {
  constructor(props) {
    super(props);   
    }
 
  handleRemove = (index)  => {  
    const  appSolr =  this.props.listApps[index]
    axios.post('http://localhost:8081/delete', appSolr)//'http://172.17.0.1:8081/doc
    .then(res => res.data)
    .catch((error) => {
      console.log(error);
    });
    this.props.dispatch({
      type: YajadeActionTypes.DeleteApp, index
    })
    
  }
  
 render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                   <Link to={'/forms/app/new'}> <Button color="success"
                  className="search-button">
                  +   Application
              </Button>

              </Link>  
              </CardHeader>
              <CardBody>
               


   {this.props.listApps?  <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th> Application </th>
                      <th>Lien</th>
                      <th>Date de modification</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    
                     {this.props.listApps.map((app, index) =>
                     <tr>
                        <td>{app.name}</td>
                        <td><a href={app.lien}>Learn More</a></td>
                        <td> {app.registered} </td>
                        <td>
                          <Link to={`/apps/table/${index}`}>  <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i> Editer</Button></Link>
                       <Button type="reset" size="sm" color="danger"  style={{ marginLeft: 10 }}   onClick={() => this.handleRemove(index)}> <i className="fa fa-ban" ></i> Supprimer</Button>
                        </td>
                      </tr>
                    )}
                    </tbody>
  
                  </Table>
         
          : <h1> aucune résultat
          </h1>}
          
                    

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}
const mapStateToProps = state => {
  return {
    listApps: state.appsList

  };
};



export default connect(
  mapStateToProps,
)(AppsTable);



