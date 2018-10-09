import React, { Component } from 'react';
import { ControlLabel, FormControl, Modal } from 'react-bootstrap';
import Utils from './utils';

class LoginModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      show: props.show,
      showInvalidEmailMessage: false,
      userEmail: ''
    }
    this.close = this.close.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setUserAndClose = this.setUserAndClose.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({show:nextProps.show});
  }

  close(){
    this.props.closeLoginModal();
  }

  setUser(event){
    let email = event.target.value;
    this.setState({userEmail: email});
  }

  setUserAndClose(event){
    event.preventDefault();
    if (Utils.isValidEmailAddress(this.state.userEmail)) {
      this.props.setUser(this.state.userEmail);
      this.close();
    } else {
      this.setState({showInvalidEmailMessage: true});
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Enter Email Address</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.setUserAndClose}>
            <Modal.Body className="modalBody">
              {this.state.showInvalidEmailMessage === true &&
                <div class="Error-message">Please enter a valid email address.</div>
              }
              <ControlLabel>Email Address: </ControlLabel>
              <FormControl type="text" name="userEmail" onChange={this.setUser} value={this.state.userEmail}/>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="btn btn-primary" type="submit">OK</button>
            </Modal.Footer>
          </form>
        </Modal>
    );

  }

}

export default LoginModal;
