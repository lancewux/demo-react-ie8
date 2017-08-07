require('es5-shim');
require('es5-shim/es5-sham');
const React = require('react');
const ReactDOM = require('react-dom');

import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { browserHistory } from 'react-router'

import App from './App'
import About from './About'
import Repos from './Repos'
import Repo from './Repo'
import Home from './Home'

ReactDOM.render(
  (
  <Router history={browserHistory}>
    <Route path="/" component={App}>

      {/* add it here, as a child of `/` */}
      <IndexRoute component={Home}/>

      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
),
  document.getElementById('root')
);