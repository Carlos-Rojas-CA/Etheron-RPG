import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles'

import theme from '../../utils/themeUtil';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import Dashboard from '../../pages/Dashboard'

import Auth from '../../utils/Auth';
import { 
  PrivateRoute
} from '../Routes';

function App() {
  // Setting our component's initial state
  const [authenticated, setAuthenticated] = useState(false)
  //const [formObject, setFormObject] = useState({})

  // Toggles if the user is authenticated.
  useEffect(() => {
    toggleAuthStatus()
  }, [])

  // Loads all books and sets them to books
  function toggleAuthStatus() {
    setAuthenticated(Auth.isUserAuthenticated())
  };


  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path='/' component={() => (authenticated 
            ? <Redirect to="/dashboard" /> 
            :<SignIn toggleAuthStatus={toggleAuthStatus} />)} ></Route>
          <Route exact path='/signup' component={SignUp}></Route>
          <PrivateRoute exact path="/dashboard" component={() => <Dashboard toggleAuthStatus={toggleAuthStatus}/>}/>
        </Switch>
      </ThemeProvider>
    </Router>

  );
}



/*
class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={ theme }>
          <Switch>
            <Route exact path='/' component={ Homepage }></Route>
            <Route exact path='/signin' component={ SignIn }></Route>
            <Route exact path='/signup' component={ SignUp }></Route>
          </Switch>
        </ThemeProvider>
      </Router>
      
    );
  }
}
*/
export default App;
