import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { deleteUser } from '../redux/actions';
import Modal from 'react-modal';
import { editUser } from '../redux/actions';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '350px'
    }
};

class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
            currentUser: {}
        }
    }

    openModal() {
        this.setState({ isModalOpen: true })
    }

    closeModal() {
        this.setState({ isModalOpen: false })
    }

    render() {
        return (
            <table className="table table-bordered userList">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                {this.props.users.length > 0 ? this.props.users.map((user) => {
                    return (
                        <tbody key={user.id}>
                            <tr>
                                <td>{user.lname} {user.fname}</td>
                                <td>{user.email}</td>
                                <td><button onClick={() => { this.openModal(); this.setState({ currentUser: user }) }}>
                                    Edit
                                     <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} style={customStyles} contentLabel="Edit User">
                                        <h4>Edit User</h4>
                                        <button className="Update btn btn-default" onClick={() => this.closeModal()}>X</button>
                                        <hr />
                                        <form onSubmit={(e) => {
                                            this.props.editUser({
                                                id: this.state.currentUser.id,
                                                fname: this.refs.fname.value,
                                                lname: this.refs.lname.value,
                                                email: this.refs.email.value
                                            });
                                            e.preventDefault();
                                            this.closeModal();
                                        }}>
                                            <label>First Name: </label><input type="text" name="fname" ref="fname" defaultValue={this.state.currentUser.fname} /> <br />
                                            <label>Last Name: </label><input type="text" ref="lname" defaultValue={this.state.currentUser.lname} /> <br />
                                            <label>Email: </label><input type="text" ref="email" defaultValue={this.state.currentUser.email} /> <br />
                                            <input className=" Update btn btn-primary" type="submit" value="Update" />
                                        </form>
                                    </Modal>
                                </button></td>
                                <td><button onClick={() => {
                                    this.props.deleteUser(user.id)
                                }}>Remove</button></td>
                            </tr>
                        </tbody>);
                }) :
                    <tbody>
                        <tr>
                            <td className="no-user">
                                No users to display
                                </td>
                        </tr>
                    </tbody>
                }
            </table>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (id) => {
            dispatch(deleteUser(id));
        },
        editUser: (user) => {
            dispatch(editUser(user));
        }
    };
};


export default connect(() => { return {}; }, mapDispatchToProps)(UserList);