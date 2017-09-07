import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';
import uuid from 'uuid';
import PropTypes from 'prop-types';

class AddUser extends Component {
    render() {
        return (
            <div className="container addUser">
                <form onSubmit={(e) => {
                    this.props.addUser({
                        id: uuid.v4(),
                        fname: this.refs.fname.value,
                        lname: this.refs.lname.value,
                        state: this.refs.state.value,
                        city: this.refs.city.value,
                        email: this.refs.email.value
                    });
                    e.preventDefault();
                }}>
                    <label>First Name: </label><input type="text" ref="fname" placeholder="Enter first name" required /><br />
                    <label>Last Name: </label><input type="text" ref="lname" placeholder="Enter last name" required /><br />
                    <label>State: </label><input type="text" ref="state" placeholder="State"/><br />
                    <label>City: </label><input type="text" ref="city" placeholder="City"/><br />
                    <label>Email: </label><input type="text" ref="email" placeholder="Enter email" required /><br />
                    <input className="btn btn-primary add-btn" type="submit" value="Add User" />
                </form>
            </div>
        );
    }
}

// PropType validation
AddUser.propTypes = {
    addUser: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => {
            dispatch(addUser(user));
        }
    };
};

export default connect(() => { return {}; }, mapDispatchToProps)(AddUser);