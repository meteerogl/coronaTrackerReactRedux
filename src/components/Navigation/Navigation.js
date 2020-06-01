import React, {Component, Fragment} from 'react';
import {withRouter, NavLink} from 'react-router-dom';

class Navigation extends Component {
    state = {
        active_link: this.props.location.pathname
    }

    render() {
        return (

            <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Corona App</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/">Home</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/covid-19">COVID-19</NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">
                                OTHER APP
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="fa fa-bell">
                                    <span className="badge badge-info">11</span>
                                </i>
                                Test
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="fa fa-globe">
                                    <span className="badge badge-success">11</span>
                                </i>
                                Test
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )

    }
}

export default withRouter(Navigation);