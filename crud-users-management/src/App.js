import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { checkAdmin } from './redux/actions';
import PropTypes from 'prop-types';

class App extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  render() {

    return (
      <div className="App container">
        <h2>Login To Your Account</h2>
        <form onSubmit={(e) => {
          this.props.checkAdmin({
            email: this.refs.email.value, password: this.refs.password.value
          });

          setTimeout(() => {
            console.log(this.props.admin.logValue);
            if (this.props.admin.logValue === true) {
              this.context.router.history.push("/users/adduser")
            }
          }, 200);

          e.preventDefault();
        }
        } className="Form">
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
            <input type="text" className="form-control" ref="email" placeholder="email address" />
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
            <input type="password" className="form-control" ref="password" placeholder="password" />
          </div><br />
          <input className="submit btn btn-primary" type="submit" value="Get In" /><br />
        </form>

        <p>Don't have an account? Get one</p>
        <p>Go Back to the Home Page</p>
        <p className="error-msg"><strong>{this.props.admin.errorMessage}</strong></p>
      </div>
    );
  }
}

// Props validation
App.propTypes = {
  router: PropTypes.object,
  checkAdmin: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    admin: state.admin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAdmin: (admin) => {
      dispatch(checkAdmin(admin));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
