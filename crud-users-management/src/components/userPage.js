import React, { Component } from 'react';
import '../App.css';
import { Route, Link, Redirect } from 'react-router-dom';
import AddUser from './addUser';
import SearchUser from './searchUser';

class UserPage extends Component {
  render() {
    return (
      <div className="UserPage">
        <ul className="nav nav-tabs">
          <li className="nav-item"><Link className="nav-link" to={"/users/adduser"}>Add User</Link></li>
          <li className="nav-item"><Link className="nav-link"  to={"/users/searchuser"}>Search and Update User</Link></li>
        </ul>

        <Redirect from="/" to="/users/adduser" />
        <Route exact path="/users" component={AddUser}/>
        <Route path="/users/addUser" component={AddUser} />
        <Route path="/users/searchuser" component={SearchUser} />
      </div>
    );
  }
}


export default UserPage;