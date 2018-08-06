import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { ItemPage } from '../ItemsPage';
import { OrderPage } from '../OrderPage';
import  NavBar  from '../NavBar/NavBar'
class App extends React.Component {
    constructor (props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render () {
        const { alert } = this.props;
        return (
            <div className="main">
                <NavBar></NavBar>
                <div className="jumbotron">
                    <div className="container">
                        <div className="col-sm-8 col-sm-offset-2">
                            {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }
                            <Router history={history}>
                                <div>
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <Route path="/login" component={LoginPage} />
                                    <PrivateRoute path="/register" component={RegisterPage} />
                                    <PrivateRoute path="/items" component={ItemPage} />
                                    <PrivateRoute path="/order" component={OrderPage} />
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 