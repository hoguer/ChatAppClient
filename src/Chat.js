import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chats: props.currentChat,
      showLoading: props.showLoading
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      chats: nextProps.currentChat,
      showLoading: nextProps.showLoading
    });
  }
  // componentDidMount() {
  //   // const pusher = new Pusher('APP_KEY', {
  //   //   cluster: 'APP_CLUSTER',
  //   //   encrypted: true
  //   // });
  //   // const channel = pusher.subscribe('chat'); //subscribe using chat_id
  //   // channel.bind('message', data => {
  //   //   this.setState({ chats: [...this.state.chats, data], test: '' });
  //   // });
  //   // this.handleTextChange = this.handleTextChange.bind(this);
  // }

  render() {
    if (this.state.showLoading) {
      return (
        <div className="Loading-icon-container">
          <FontAwesomeIcon icon={faSpinner} className={"fa-spin"} size="6x" />
        </div>
      );
    }
    let chatContent = <div className="No-messages">No messages to display.</div>
    if (this.state.chats.length > 0) {
      chatContent = this.state.chats.map(c =>(
        <li 
          className="list-group-item list-group-item-action" 
          key={c.UserEmail + c.CreatedTime} > {c.UserEmail + ': ' + c.Message} 
        </li>
      ));
      chatContent = (<ul> {chatContent} </ul>);
    }
    return (
      <div className="Chat-box">
        {chatContent}
      </div>
    );
  }
}

export default Chat;
