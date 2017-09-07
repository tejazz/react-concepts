import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { authContext } from './AzureAd';

class App extends Component {
  render() {

    let userName = undefined;

    // Check for authentication and store username when 
    let user = authContext.getCachedUser();
    if (user) {
      console.log("Authenticated User: ", user);
      userName = user.profile.name;
    } else {
      console.log("User not authenticated");
    }

    // Login function
    let login = () => {
      authContext.login();
    };

    // Logout function
    let logout = () => {
      authContext.logOut();
      // fetch("Your Logout Page", {
      //   method: 'POST'
      // });
    };

    // Fetch ADAL token details
    let fetchCall = () => {
      console.log('Request fetch API call');

      // Acquire token for files resource
      authContext.acquireToken(authContext.config.clientId, function (error, token) {
        console.log('API callback');

        // Handle ADAL errors
        if (error) {
          alert('ADAL error occurred: ' + error);
          return;
        }

        if (!token) {
          alert('No token!');
        }
        console.log('token:', token);

        // Standard headers
        let myHeader = new Headers({
          'Accept': 'application/json;charset=UTF-8',
          'Content-Type': 'application/json;charset=UTF-8'
        });

        // Add AAD token to header
        if (token) {
          myHeader.append('Authorization', 'Bearer ' + token);
          console.log('add auth token to header');
        }

        let url = 'your api url...';
        fetch(url, {
          method: 'GET',
          headers: myHeader
        }).then((response) => {
          console.log('response.status', response.status);
          console.log('response.body', response.body);
          response.json().then((json) => {
            console.log('JSON', json);
          });
        }).catch(function (err) {
          console.log('Fetch Error: ', err);
        });
      });

      console.log('Leave fetch API call');
    };

    // Define the content being rendered
    let content = undefined;
    if (userName) {
      content = (
        <div>
          <div>{userName}</div>
          <button className="btn btn-primary" onClick={logout}>Logout</button>
          <button className="btn btn-default" onClick={fetchCall}>Fetch Call</button>
        </div>
      );
    } else {
      content = (
        <div>
          <button className="btn btn-primary" onClick={login}>Login</button>
        </div>
      );
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        {content}
      </div>
    );
  }
}

export default App;
