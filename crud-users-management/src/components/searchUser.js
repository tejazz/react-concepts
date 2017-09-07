import React, { Component } from 'react';
import '../App.css';
import UserList from './userList';
import { connect } from 'react-redux';
import { searchUser, resetUser } from '../redux/actions';
import PropTypes from 'prop-types';

class SearchUser extends Component {
    render() {
        return (
            <div className="container searchUser">
                <h4>User Search</h4>
                <hr />
                <form>
                    <label>First Name*: </label><input type="text" ref="fname" placeholder="First name" />
                    <label>Email*: </label><input type="text" ref="email" placeholder="Email"/><br />
                    <label>Last Name*: </label><input type="text" ref="lname" placeholder="Last name"/>
                    <br /><br /><br />
                    <button className="search btn btn-primary" onClick={(e) => {
                        this.props.searchUser({
                            fname: this.refs.fname.value,
                            lname: this.refs.lname.value,
                            email: this.refs.email.value
                        });
                        e.preventDefault();
                    }}>Search</button>
                    <button className="search btn btn-primary" onClick={(e) => {
                        this.props.resetUser();
                        e.preventDefault();
                    }}>Reset</button>
                </form>
                <br />
                <hr />
                <UserList users={this.props.users} />
            </div>
        );
    }
}

// Props validation
SearchUser.propTypes = {
    searchUser: PropTypes.func,
    resetUser: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchUser: (user) => {
            dispatch(searchUser(user));
        },
        resetUser: () => {
            dispatch(resetUser());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);