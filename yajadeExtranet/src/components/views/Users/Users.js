import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import firebase from "firebase";
import axios from 'axios';
import { YajadeActionTypes } from "../../../reducers/yajadeReducer";
import { Badge, Card, CardBody, Button, CardHeader, Col, Row, Table } from 'reactstrap';

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userList: [],
    };
  }
  componentDidMount() {
    // this.props.dispatch({
    //   type: YajadeActionTypes.UpdateApp
    // })
    this.setState({userList: this.props.userList });
    console.log(this.props.userList) 
    
  }
  
  
  handleRemove = (index) => {
   

    const data = this.props.userList[index] ;
    axios.post('http://localhost:8081/deleteUser',data)//'http://172.17.0.1:8081/doc
    .then(res => {
 
      console.log(res.data.code);
      console.log(res.data);
   
  res.status === 200 ? 
    
  this.props.dispatch({
    type: YajadeActionTypes.DeleteUser, index
  })
 : alert("la suppression est Impossible ");
  
    })

    
    

}
  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Link to={'/forms/user/new'}> <Button color="success"
                  className="search-button">
                  +  Utilisateur
              </Button>
              </Link>    
              </CardHeader>
              <CardBody>
             

                 {this.props.userList?  <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Date d'inscription</th>
                      <th>Adresse email</th>
                      <th>Rôle</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.userList.map((user, index) =>
                      <tr key={user.name.toString()}>
                        <th>{user.name}</th>
                        <td>{user.prenom}</td>
                        <td>{user.registered}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>                     
                          <Link to={`/users/table/${index}`}>  <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i> Editer</Button></Link>
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
    )
  }
}
const mapStateToProps = state => {
  return {
    userList: state.userList
  };
};

export default connect(
  mapStateToProps,
)(Users);
