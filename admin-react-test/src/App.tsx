import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { GlobalStyle } from './styles/GlobalStyles'
import Login from './views/Login'
import Admin from './views/Admin'
function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={Admin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
