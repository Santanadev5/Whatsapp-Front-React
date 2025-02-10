import './App.css';
import Image from "./assets/foto.jpeg"

function App() {
  return (
    <div className="container">
       <div className='back-ground'></div>
       <div className='chat-container'>
        
          <div className='chat-contacts'>
            <div className='chat-options'></div>
            <div className='chat-item'>
              <img src={Image} className='image-profile' alt='' />
              <div className='title-chat-container'>
                <span className='title-message'>Nicolas Santana </span>
                <span className='last-message'> Nicolas: Olá</span>
              </div>
            </div>
          </div>

       </div>
    </div>
  );
}

export default App;
