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
  
  // Track displayed message portion
  const [displayedMsg, setDisplayedMsg] = useState('');

  // Track if message is being posted
  const [isPosting, setIsPosting] = useState(false);

  let UpdateTxt = (ev) => {
    SetCurrMsg(ev.target.value);
  };
  let PostMsg = (ev) => {
    // Posting message
    //setIsPosting(true);
    SetMessages(Messages.concat([new Message(CurrMsg, 'client'), new Message(SendRequest(CurrMsg), 'lm')]));
    // Clear input field after posting msg
  //  setCurrMsg('');
    ev.preventDefault();
  };
/*
  useEffect(() => {
    // Display message letter by letter when message is being posted
    if (isPosting && displayedMsg !== currMsg) {
      const timer = setTimeout(() => {
        setDisplayedMsg(currMsg.slice(0, displayedMsg.length + 1));
      }, 100); // Adjust delay as needed
      // Clear timeout when component unmounts or when message is fully displayed
      return () => {
        clearTimeout(timer);
        if (displayedMsg === currMsg) {
          setIsPosting(false);
        }
      };
    }
  }, [isPosting, displayedMsg, currMsg]);

  return (
    <div className='chat'>
      <ul>
        {messages.map((m, index) => (
          <li className={m.from} key={index}>
            {m.from === 'welcome' ? 'Welcome!' : m.msg}
          </li>
        ))}
      </ul>
      <form onSubmit={postMsg}>
        <input type='text' placeholder='Ask me anything...' value={currMsg} onChange={updateTxt} />
        <input type='submit' value='Send' />
      </form>
    </div>
  );
}
*/
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
