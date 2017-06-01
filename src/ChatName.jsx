import React from 'react';
import Modal from 'react-modal';

const customStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '30px'
  }
};

export default class ChatName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {textValue: '', modalIsOpen: props.modalIsOpen};

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  handleChangeText(event) {
    this.setState({textValue: event.target.value})
  }

  handleClickButton() {
    localStorage.setItem('chatName', this.state.textValue);
    this.props.closeChatName();
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <Modal contentLabel="Modal" isOpen={this.state.modalIsOpen} style={customStyle}>
        <div>
          Nick Name: <input type="text" onChange={this.handleChangeText}/>
          <button onClick={this.handleClickButton}>OK</button>
        </div>
      </Modal>
    );
  }
}
