import { useEffect, useState } from 'react';
import './App.css';
import Image from "./assets/ft2.png";
import SendMessageIcon from "./assets/img-enviar.png";
import { io } from "socket.io-client";



const socket = io('http://localhost:4000');

function App() {
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("users", (users) => setUsers(users));

    socket.on("message", (message) => {
      console.log("Nova mensagem recebida:", message); 
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("users");
      socket.off("message");
    };
  }, []);

  const handleJoin = () => {
    if (name) {
      socket.emit("join", name);
      setJoined(true);
    }
  };

  const handleMessage = () => {
    if (message) {
      socket.emit("message", { name, message });
      setMessage("");
    }
  };

  if (!joined) {
    return (
      <div className="join-container">
        <span>Digite seu nome</span>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleJoin}>Entrar</button>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='back-ground'></div>
      <div className='chat-container'>
        <div className='chat-contacts'>
          <div className='chat-options'></div>
          <div className='chat-item'>
            <img src={Image} className='image-profile' alt='' />
            <div className='title-chat-container'>
              <span className='title-message'>Grupo DEV</span>
              <span className='last-message'>
                {messages.length
                  ? `${messages[messages.length - 1].name}: ${messages[messages.length - 1].message}`
                  : ''}
              </span>
            </div>
          </div>
        </div>

        <div className='chat-messages'>
          <div className='chat-options'>
            <div className='chat-item'>
              <img src={Image} className='image-profile' alt='' />
              <div className='title-chat-container'>
                <span className='title-message'>Grupo DEV</span>
                <span className='last-message'>
                  {users.map((user, index) => (
                    <span key={index}>
                      {user.name}
                      {index + 1 < users.length ? ", " : ""}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>

          <div className='chat-messages-area'>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.name === name ? 'sent' : 'received'}`}
              >
                <span className="message-name">{msg.name}</span>
                <span className="message-text">{msg.message}</span>
              </div>
            ))}
          </div>

          <div className='chat-input-area'>
            <input
              className='chat-input'
              placeholder='Mensagem'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <img
              src={SendMessageIcon}
              alt=''
              className='send-message-icon'
              onClick={handleMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
