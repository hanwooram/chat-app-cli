import React from 'react';

export default class ChatMessage extends React.Component {
  render() {
    console.log('this.props.messages: ', this.props.messages);
    return (
      <div>
        {this.props.messages.map((message, index) => (
          <div key={index}>
            <b>{message.user.name} : </b><span>{message.content}</span>
          </div>
        ))}
      </div>
    );
  }
}
