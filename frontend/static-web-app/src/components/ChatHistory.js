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


async function SendRequest(body, DPM, setDPM) {
  // TODO: Send message body as request to LLM backend
  console.log(body);
  /*let conn = new WebSocket('localhost:25519');
  conn.addEventListener('message', (ev) => {
    setDPM(ev.data);
  });*/
  let str = '';
  DPM.msg = str;
  setDPM(DPM);
  for (let i=0; i < 10000; i+=10) {
    setTimeout(()=>{str=str+'a';DPM.msg = str;setDPM(DPM);}, i);
  }
  

}



function Chat() {
  const [ Messages, SetMessages ] = useState([new Message('', 'welcome')]);
  
  const [ CurrMsg, SetCurrMsg ] = useState('');
  
  // Track displayed message portion
  const [displayedMsg, setDisplayedMsg] = useState(new Message('', 'lm'));

  // Track if message is being posted
  const [isPosting, setIsPosting] = useState(false);

  let UpdateTxt = (ev) => {
    SetCurrMsg(ev.target.value);
  };


  let PostMsg = (ev) => {
    // Posting message
    SetMessages(Messages.concat([new Message(CurrMsg, 'client')]));
    setIsPosting(true);
    SendRequest(CurrMsg, displayedMsg, setDisplayedMsg);
    // Clear input field after posting msg*/
    SetCurrMsg('');
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
        {isPosting?(<li class='lm'>{displayedMsg.msg+'...'}</li>):null}

      </ul>
      <form onSubmit={PostMsg}>
        <input type='text' placeholder='Ask me anything...' value={CurrMsg} onChange={UpdateTxt}/>
        <input type='submit' value='Send'/>
      </form>
    </div>
  );


}



export default Chat;
