import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router,Switch} from 'react-router-dom'
import './index.css';
import App from './App';
import DBLink from './DBLink';
import Crud from './Crud';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <ul class="navbar-nav">
    <li class="nav-item">
      <Link to = "/" className="nav-link">Home</Link>
    </li>
    <li class="nav-item">
      <Link to = "/connect" className="nav-link">Connect</Link>
    </li>
    <li class="nav-item">
      <Link to = "/data" className="nav-link">Users</Link>
    </li>
  </ul>
</nav>
<Switch>
  <Route exact path="/" component={App} />
  <Route path="/connect" component={DBLink} />
  <Route path="/data" component={Crud} />
</Switch>
</Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
