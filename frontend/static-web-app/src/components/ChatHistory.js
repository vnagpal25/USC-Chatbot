import React, { useState } from 'react';

const Sender = Object.freeze({
  NIL: -1,
  CLIENT: 0,
  LM: 1
});

class Message {
  constructor(msg, from) {
    this.msg = msg;
    this.from = from;
  }
}


function SendRequest(body) {
  // TODO: Send message body as request to LLM backend
  console.log(body);
  return '[LM]: I received the message, ' + body;

}
/*
class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'hello'};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});
  }

  handleSubmission(event) {
    // TODO: cfg call to LLM for response
    console.log(this.state.value);
    event.preventDefault();
  }

  render() {
  return (
    <form onSubmit={this.handleSubmission}>
      <input type='text' value={this.state.value} onChange={this.handleChange} />
      <input type='submit' value='Send'/>
    </form>
  );
  };
}*/


function Chat() {
  const [ Messages, SetMessages ] = useState([new Message('', 'welcome')]);
  
  const [ CurrMsg, SetCurrMsg ] = useState('');

  let UpdateTxt = (ev) => {
    SetCurrMsg(ev.target.value);
  };
  let PostMsg = (ev) => {
    SetMessages(Messages.concat([new Message(CurrMsg, 'client'), new Message(SendRequest(CurrMsg), 'lm')]));
    ev.preventDefault();
  };
  let MessageHist = Messages.map((m) => {
        return (
          <li class={m.from}>
            {m.from == 'welcome' ? 'Welcome!' : m.msg}
          </li>
        )});


  return (
    <div class='chat'>
      <ul>
        {MessageHist}
      </ul>
      <form onSubmit={PostMsg}>
        <input type='text' placeholder='Ask me anything...' value={CurrMsg} onChange={UpdateTxt}/>
        <input type='submit' value='Send'/>
      </form>
    </div>
  );


}



export default Chat;
