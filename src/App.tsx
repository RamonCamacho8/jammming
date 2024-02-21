import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlaylistsContainer from './components/PlaylistsContainer';
import SearchBarResults from './components/SearchBarResults';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SearchBar />
        <SearchBarResults />
        <PlaylistsContainer />
      </header>
    </div>
  );
}

export default App;
