require('es5-shim')
require('es5-shim/es5-sham')
const React = require('react')
const ReactDOM = require('react-dom')

import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory} from 'react-router'

import Home from './pages/Home'
import About from './pages/About'

import { Provider } from 'react-redux'
// import store from './redux'
import router from './router'

console.log(router);

ReactDOM.render(
  <Provider>
    // <Router history={browserHistory}>
    //     <Route path="/" component={Home}>
    //         <IndexRoute component={About} />//首页
    //         <Redirect from='*' to='/'  />
    //     </Route>
    // </Router>
    {router}
  </Provider>,
  document.getElementById('root')
)