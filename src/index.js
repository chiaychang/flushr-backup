import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import CreateReview from './components/CreateReview'
import CreateUser from './components/CreateUser'
import LoginUser from './components/LoginUser'
import Search from './components/Search'
import About from './components/About'

import { Router, Route, browserHistory } from 'react-router'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'
import 'tachyons'
import 'semantic-ui/dist/semantic.min.css'

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj4als4tt5zbg0141i8uzents' })

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('graphcoolToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('graphcoolToken')}`
    }
    next()
  },
}])

const client = new ApolloClient({ networkInterface })

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='create' component={CreateReview} />
      <Route path='login' component={LoginUser} />
      <Route path='signup' component={CreateUser} />
      <Route path='search' component={Search} />
      <Route path='about' component={About} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
