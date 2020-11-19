import './styles/App.css';
import { Switch, Route } from 'react-router-dom'
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Articles from './components/blog/Articles';
import Article from './components/blog/Article';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoute';

function App() {
  return (
    <div className="container">
      <Switch>
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <Route path='/login'  component={Login} />
        <Route path='/register'  component={Register} />
        <Route exact path='/' component={Articles} />
        <Route exact path='/:id' component={Article} />

      </Switch>
    </div>
  );
}

export default App;
