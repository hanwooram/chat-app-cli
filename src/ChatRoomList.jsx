import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';

const customStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '70px'
  }
};

export default class ChatRoomList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      modalIsOpen: false,
      title: '',
      capacity: 1
    };

    this.handleClickRegisterBtn = this.handleClickRegisterBtn.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleClickOkBtn = this.handleClickOkBtn.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8080/rooms').then(response => {
      this.setState({rooms: response.data})
    });
  }

  handleClickRegisterBtn() {
    this.setState({modalIsOpen: true});
  }

  handleChangeText(event) {
    this.setState({title: event.target.value});
  }

  handleChangeSelect(event) {
    this.setState({capacity: event.target.value})
  }

  handleClickOkBtn() {
    var room = {
      title: this.state.title,
      capacity: this.state.capacity
    };

    axios.put('http://localhost:8080/room', room).then(response => {
      var rooms = this.state.rooms;
      rooms.unshift(response.data);
      this.setState({rooms: rooms, modalIsOpen: false});
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClickRegisterBtn}>Register</button>
        <div style={{marginTop: '5px'}}>
          {
            this.state.rooms.length === 0 ? (
              <div>개설된 방이 없습니다.</div>
            ) : (
              this.state.rooms.map((room, index) => (
                <div key={index} style={{border: '1px solid'}}>
                  <Link to={'/room/' + room.id}>{room.title}</Link>
                </div>
              ))
            )
          }
        </div>
        <Modal contentLabel="ChatRoomList" isOpen={this.state.modalIsOpen} style={customStyle}>
          <div>
            <div>Title : <input type="text" onChange={this.handleChangeText}/></div>
            <div>Capacity :&nbsp;
              <select value={this.state.capacity} onChange={this.handleChangeSelect}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
              </select>
            </div>
            <button onClick={this.handleClickOkBtn}>OK</button>
          </div>
        </Modal>
      </div>
    );
  }
}
