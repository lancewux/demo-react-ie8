import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory} from 'react-router'
const React = require('react')

import Home from '../pages/Home'
import About from '../pages/About'

const RouteConfig = (
    <Router history={browserHistory}>
        <Route path="/" component={Home}>
            <IndexRoute component={About} />//首页
            <Redirect from='*' to='/'  />
        </Route>
    </Router>
)

export default RouteConfig
