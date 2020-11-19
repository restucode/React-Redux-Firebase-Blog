import React from 'react'
import NavbarDashboard from '../layout/NavbarDashboard'
import { Switch } from 'react-router-dom'
import Profile from './Profile';
import ListArticle from './ListArticle';
import CreateArticle from './CreateArticle';
import EditArticle from './EditArticle';
import PrivateRoute from './../Routes/PrivateRoute';

const Dashboard = () => {
    return (
      <>
       <NavbarDashboard />
       <Switch>
           <PrivateRoute exact path='/dashboard' component={ListArticle} />
           <PrivateRoute path='/dashboard/profile' component={Profile} />
           <PrivateRoute path='/dashboard/tambah-artikel' component={CreateArticle} />
           <PrivateRoute path='/dashboard/edit-artikel' component={EditArticle} />
       </Switch>
      </>
    )
}

export default Dashboard
