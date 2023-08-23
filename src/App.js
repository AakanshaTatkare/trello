import React from 'react';
import './App.css';
import Board from './Components/Board';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TaskFlow</h1>
      </header>
      <main className="App-main">
        <Board />
      </main>
    </div>
  );
}

export default App;
