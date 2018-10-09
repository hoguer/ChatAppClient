import React, { Component } from 'react';
import axios from 'axios';
import Chat from './Chat';
import ChatList from './ChatList';
import Utils from './utils';

class ChatContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chats: props.chats,
      currentChat: [],
      chatLoading: false
    };
    this.setCurrentChat = this.setCurrentChat.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({chats:nextProps.chats});
  }

  setCurrentChat(chatId) {
    this.setState({chatLoading:true});
    axios.get(Utils.getChatAPIProductionURL() + "messages/" + chatId).then(function (response) {
      this.setState({currentChat:response.data, currentChatId:chatId, chatLoading:false});
    }.bind(this))
    .catch(function (error) {
      console.log(error);
      alert("Something went wrong. Please contact the ChatApp administrator at rachel.hogue.smith@gmail.com");
    });
  }

  render() {
    return (
      <div className="Container">
        <ChatList chats={this.state.chats} setCurrentChat={this.setCurrentChat} />
        <Chat currentChat={this.state.currentChat} showLoading={this.state.chatLoading} currentUser={this.props.user} chatId={this.state.currentChatId}/>
      </div>

    );
  }
}

export default ChatContainer;
