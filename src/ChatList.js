import React, { Component } from 'react';

class ChatList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chats: props.chats
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({chats:nextProps.chats});
  }

  render() {
    let chats = "No existing chats.";
    if (this.state.chats.length > 0) {
      chats = (this.state.chats).map( chat =>(
        <li 
          className={"list-group-item list-group-item-action" + (chat.ChatId === this.props.currentChatId? " Active-chat" : "")}
          key={chat.ChatId} 
          onClick={() => this.props.setCurrentChat(chat.ChatId)}> {chat.Members.join(', ')} 
        </li>
      ));
    }

    return (
      <div className="Chat-list">
        <h3>Chats</h3>
        <ul className="list-group">
          {chats}
        </ul>
      </div>
    );
  }
}

export default ChatList;
