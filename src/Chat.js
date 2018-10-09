import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from 'react-bootstrap';
import axios from 'axios';
import Utils from './utils';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: props.currentChat,
      showLoading: props.showLoading,
      message: '',
      currentUser: props.currentUser,
      chatId: props.chatId
    };
    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      messages: nextProps.currentChat,
      showLoading: nextProps.showLoading,
      currentUser: nextProps.currentUser,
      chatId: nextProps.chatId
    });
  }

  updateMessage(event){
    let message = event.target.value;
    this.setState({message: message});
  }

  sendMessage(){
    axios.post(Utils.getChatAPIProductionURL() + "messages/" + this.state.chatId, {
      user_email: this.state.currentUser, 
      message: this.state.message
    }).then(function (response) {
      this.setState({
        messages: [...this.state.messages, {
          UserEmail: this.state.currentUser,
          Message: this.state.message,
          CreatedTime: (new Date()).getTime()
        }],
        message: ''
      });
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
    let chatContent = <div className="No-messages">No messages to display.</div>
    if (this.state.messages.length > 0) {
      let chatList = this.state.messages.map(m =>(
        <li 
          className="list-group-item list-group-item-action" 
          key={m.UserEmail + m.CreatedTime} > {m.UserEmail + ': ' + m.Message} 
        </li>
      ));
      chatContent = (<ul> 
        {chatList} 
      </ul>);
    }
    return (
      <div className="Chat-box">
        {chatContent}
        {this.state.chatId &&
          <div>
            <FormControl type="textarea" name="chatMessage" onChange={this.updateMessage} value={this.state.message}/>
            <button type="button" className="btn btn-primary" disabled={this.state.message.length === 0} onClick={this.sendMessage}>SEND</button>
          </div>
        }
      </div>
    );
  }
}

export default Chat;
