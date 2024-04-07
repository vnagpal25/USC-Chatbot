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


async function SendRequest(body, AddMsg) {
  // TODO: Send message body as request to LLM backend
  console.log(body);
  AddMsg(new Message((await fetch("http://localhost:25519/webhooks/rest/webhook", {
    method: "POST",
    body: JSON.stringify({
      sender: "0",
      message: body
    }),
    headers: {
      "Content-type": "application/json"
    }
  }).then((response) => {
    return response.json();
  }))[0].text, 'lm'));
  

  

}



function Chat() {
  const [ Messages, SetMessages ] = useState([new Message('', 'welcome')]);
  
  const [ CurrMsg, SetCurrMsg ] = useState('');
  

  let UpdateTxt = (ev) => {
    SetCurrMsg(ev.target.value);
  };


  let PostMsg = (ev) => {
    // Posting message
    SetMessages(Messages.concat([new Message(CurrMsg, 'client')]));
    SendRequest(CurrMsg, (msg)=> SetMessages(Messages.concat([msg])));
    //SetMessages(Messages.concat([new Message(rsp, 'lm')]));
    // Clear input field after posting msg*/
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
