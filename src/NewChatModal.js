import React, { Component } from 'react';
import { ControlLabel, FormControl, Modal } from 'react-bootstrap';
import axios from 'axios';
import Utils from './utils';

class NewChatModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      show: props.show,
      showInvalidEmailMessage: false,
      userEmail: ''
    }
    this.setUser = this.setUser.bind(this);
    this.createChatAndClose = this.createChatAndClose.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({show:nextProps.show});
  }

  setUser(event){
    let email = event.target.value;
    this.setState({userEmail: email});
  }

  createChatAndClose(event){
    //call axios to create new chat
    //update list and current chat in chat container
    event.preventDefault();
    if (Utils.isValidEmailAddress(this.state.userEmail)) {
      axios.post(Utils.getChatAPIProductionURL() + "chats/", {
        members: [
          this.state.userEmail,
          this.props.currentUser
        ]
      }).then(function (response) {
        this.props.addChatAndSetToCurrent({
          ChatId: response.data.ChatId,
          Members: [this.state.userEmail]
        });
        this.props.close();
      }.bind(this))
      .catch(function (error) {
        console.log(error);
        alert("Something went wrong. Please contact the ChatApp administrator at rachel.hogue.smith@gmail.com");
      });
    } else {
      this.setState({showInvalidEmailMessage: true});
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Email Address</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.createChatAndClose}>
            <Modal.Body className="modalBody">
              {this.state.showInvalidEmailMessage === true &&
                <div class="Error-message">Please enter a valid email address.</div>
              }
              <ControlLabel>Enter the email address of the person you would like to chat with: </ControlLabel>
              <FormControl type="text" name="userEmail" onChange={this.setUser} value={this.state.userEmail}/>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-primary" type="submit">OK</button>
            </Modal.Footer>
          </form>
        </Modal>
    );

  }

}

export default NewChatModal;
