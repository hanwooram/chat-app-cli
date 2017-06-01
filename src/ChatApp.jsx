import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, BrowserRouter, Redirect } from 'react-router-dom';
import ChatRoomList from './ChatRoomList';
import ChatMessageContainer from './ChatMessageContainer';

export default class ChatApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={ ChatRoomList } />
          <Route path="/room/:id" component={ChatMessageContainer} />
        </div>
      </BrowserRouter>
    );
  }
}
