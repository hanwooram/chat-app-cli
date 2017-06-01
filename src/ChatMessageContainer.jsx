import React from 'react';
import Stomp from 'stompjs';
import ChatName from './ChatName';
import ChatMessage from './ChatMessage';

export default class ChatMessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.stompClient = null;
    this.state = {messages: [], name: '', textValue: '', modalIsOpen: true};

    this.handleChangeText = this.handleChangeText.bind(this);
    this.closeChatName = this.closeChatName.bind(this);
  }

  handleChangeText(event) {
    this.setState({textValue: event.target.value})
  }

  closeChatName() {
    this.setState({modalIsOpen: false});
  }

  componentDidMount() {
    var websocket = new SockJS("http://localhost:8080/chat-server");

    this.stompClient = Stomp.over(websocket);

    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe('/topic/content/' + this.props.match.params.id, (content) => {
        this.setState({
          messages: this.state.messages.concat(JSON.parse(content.body)),
          name: '',
          textValue: ''
        });
      });
    }, function(error) {
      console.log('error: ', error);
    });
  }

  sendMessage = () => {
    var message = {
      chatRoom: {
        id: this.props.match.params.id
      },
      user: {
        name: localStorage.getItem('chatName')
      },
      content: this.state.textValue
    };

    this.stompClient.send('/chat/message/' + this.props.match.params.id, {}, JSON.stringify(message));
  }

  render() {
    return (
      <div>
        {
          !this.state.modalIsOpen &&
          <div id={this.props.match.params.id}>
            <div style={{width: '100%', height: '500px', border: '1px solid'}}>
              <ChatMessage messages={this.state.messages} name={this.state.name} />
            </div>
            <input
              type="text" style={{width: '200px'}} value={this.state.textValue} onChange={this.handleChangeText}/><button onClick={this.sendMessage}>SEND</button>
          </div>
        }
        <ChatName modalIsOpen={this.state.modalIsOpen} closeChatName={this.closeChatName}/>
      </div>
    );
  }
}
