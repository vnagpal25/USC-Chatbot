import logo from './logo.svg';
import './App.css';
import Chat from './components/ChatHistory'
let ct = 0;

function HelloWorld() {
  document.getElementById("testbtn").textContent = "Test" + ct++;
}






function TestBtn() {
  return (
    <button  id="testbtn" onClick={HelloWorld}>
      Test
    </button>
  );
}



function App() {
  return (
    <Chat/>
  );
}



export default App;
