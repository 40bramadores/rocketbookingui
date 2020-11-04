import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import './App.css';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import About from './components/About';
import Reservations from './components/Reservations';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item className="navbar-logo">
              <FontAwesomeIcon icon={faRocket} size='2x' />
              <label className="navbar-companyname">Rocket Booking</label>
            </Menu.Item>
            <Menu.Item as='a'>
              <Link className='Nav-link' to='/Reservas'>
                Reservas
              </Link>
            </Menu.Item>
            <Menu.Item as='a'>
              <Link className='Nav-link' to='/PanelGestion'>
                Panel de Gestión
              </Link>
            </Menu.Item>
            <Menu.Item as='a'>
              <Link className='Nav-link' to='/Nosotros'>
                Nosotros
              </Link>
            </Menu.Item>
          </Container>
        </Menu>
        <Switch>
          <Route path='/reservas'><Reservations /></Route>
          <Route path='/panelgestion'> <AdminPanel /> </Route>
          <Route path='/nosotros'> <About /> </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
