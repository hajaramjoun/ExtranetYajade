import React from 'react';
import Cards from './components/views/dashboard/dashboard'
import Agenda from './components/views/dashboard/agenda'
import List from './components/views/dashboard/raccourcis'
import Users from './components/views/Users/Users'
import User from './components/views/Users/User'
import FormsApp from './components/views/Forms/FormsApp'
import FormsUser from './components/views/Forms/FormsUser'
import AppsTable from './components/views/Apps/AppsTable'
import App from './components/views/Apps/App'
import RechercheApp from './components/views/Apps/AppRecherche'


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Cards },
  { path: '/apps/raccourcis', exact: true, name: 'Raccourcis', component: List },
  { path: '/apps/agenda', exact: true, name: 'agenda', component: Agenda },
  { path: '/dashboard/cards', name: 'Cards', component: Cards },
  { path: '/forms/app', name: 'FormsApp', component: FormsApp },
  { path: '/forms/user/new', name: 'FormsUsers', component: FormsUser },
  { path: '/users/table', exact: true,  name: 'Users', component: Users },
  { path: '/apps/table', exact: true, name: 'AppsTable', component: AppsTable },
   { path: '/users/table/:id', exact: true, name: 'User Details', component: User },
  { path: '/apps/table/:id', exact: true, name: 'App Detail', component: App },
  { path: '/apps/recherche',  name: 'App Recherch', component: RechercheApp },
];

export default routes;