import SignUp from "./SignUp";
import { Container } from 'react-bootstrap';
import AuthProvider from '../components/contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from '../components/PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from "./UpdateProfile";
import SecretPage from './SecretPage';

function App() {
  return (
    <AuthProvider>
      <Container className="d-flex align-items-center
        justify-content-center"
        style={{ minHeight: '100vh'}}
      >
        <div className="w-100" style={{ maxWidth: '400px'}}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path='/' component={Dashboard} />
                <PrivateRoute path='/update-profile' component={UpdateProfile} />
                <PrivateRoute path='/secret-page' component={SecretPage} />
                <Route path='/signup' component={SignUp} />
                <Route path='/login' component={Login} />
                <Route path='/forgot-password' component={ForgotPassword} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
