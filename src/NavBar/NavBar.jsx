import React from 'react';
import { Link } from 'react-router-dom';

const Component = React.Component;
import './NavBar.css'

class NavBar extends Component {
  render () {
    return (
      <div className="header">
        <img src="/src/assets/Juliett.png" />
        {/* <Link to="/login">Logout</Link>
                    <Link to="/register" className="btn btn-link">Register a new user</Link>
                    <Link to="/items" className="btn btn-link">Items</Link>
                    <Link to="/order" className="btn btn-link">Orders</Link> */}

      </div>
    )
  }
}

export default NavBar;