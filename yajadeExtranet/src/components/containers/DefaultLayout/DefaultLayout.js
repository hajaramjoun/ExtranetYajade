import React, { Component, Suspense } from 'react';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Container, Nav, Dropdown, DropdownToggle, DropdownMenu, NavLink, NavItem, } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  AppFooter,
  AppHeader,
  AppSidebar,

} from '@coreui/react';

import routes from '../../../routes';


class DefaultLayout extends Component {
  constructor(props) {
    super(props);

   
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
 
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg" >
            <Nav vertical>
              <div className='menu'>
                <h5>Applications </h5>
                <NavItem>
                  <NavLink> <Link to="/apps/table"> <h7>Liste</h7></Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink> <Link to="/forms/app"> <h7>Ajout</h7></Link></NavLink>
                </NavItem>
                <h5>Utilisateurs </h5>
                <NavItem>
                  <NavLink><Link to="/users/table"> <h7>Liste</h7></Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to="/forms/user/new"> <h7>Ajout</h7></Link></NavLink>
                </NavItem>
              </div>
            </Nav>



          </AppSidebar>
          <main className="main">
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )} />
                  ) : (null);
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>

            </Container>
          </main>
        </div>

        <DefaultFooter />

      </div>
    );
  }
}

export default DefaultLayout;
