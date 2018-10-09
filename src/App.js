import React, { Component } from 'react';
import axios from 'axios';
import LoginModal from './LoginModal';
import ChatContainer from './ChatContainer';
import Utils from './utils';
import './stylesheets/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      chats: [],
      user: '',
      showLoginModal: true,
      showLoading: false
    }
    this.setUser = this.setUser.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
  }

  closeLoginModal() {
    this.setState({showLoginModal:false});
  }

  setUser(user){
    this.setState({showLoading:true});
    // Load existing chats
    axios.get(Utils.getChatAPIProductionURL() + "chats/" + user).then(function (response) {
      this.setState({chats:response.data, showLoading:false, user:user});
    }.bind(this))
    .catch(function (error) {
      console.log(error);
      alert("Something went wrong. Please contact the ChatApp administrator at rachel.hogue.smith@gmail.com");
    });
  }

  render() {
    if (this.state.showLoading) {
      return (
        <div className="Loading-icon-container">
          <FontAwesomeIcon icon={faSpinner} className={"fa-spin"} size="6x" />
        </div>
      );
    }

    return (
      <div className="App">
        <LoginModal 
          show={this.state.showLoginModal} 
          setUser={this.setUser} 
          closeLoginModal={this.closeLoginModal} 
        />
        <ChatContainer chats={this.state.chats} user={this.state.user}/>
      </div>
    );
  }
}

export default App;
