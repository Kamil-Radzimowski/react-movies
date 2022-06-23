import React from 'react';
import logo from './logo.svg';
import movie_logo from './the-movie-db-logo.svg'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div className="Header-left">
              <img src={movie_logo} alt='movie database logo'/>
              <div>Movies</div>
          </div>
          <div>Login</div>
      </header>

    </div>
  );
}

export default App;
