import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomePage.css';
import { userActions } from '../_actions';

class HomePage extends React.Component {

    componentDidMount () {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser (id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render () {
        const { user, users } = this.props;
        return (
            <div className="splash__container">
                <div className="options__container">
                    {/* <h1>Hi {user.firstName}!</h1> */}
                    {/* <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                } */}
                    {}
                    <div className="option">
                        <Link to="/register" className="option__title">Users</Link>
                    </div>
                    <div className="option">
                        <Link to="/items" className="option__title">Items</Link>
                    </div>
                    <div className="option">
                        <Link to="/order" className="option__title">Orders</Link>
                    </div>
                </div>
                <div className="logout">
                    <Link to="/login">Logout</Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };