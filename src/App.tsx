import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlaylistsContainer from './components/PlaylistsContainer';
import SearchBarResults from './components/SearchBarResults';
import SearchBar from './components/SearchBar';

function App() {

  

  return (
    <div className="App">
      <SearchBar />
      <SearchBarResults />
      <PlaylistsContainer />
    </div>
  );
}

export default App;
