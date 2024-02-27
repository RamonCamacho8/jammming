import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import PlaylistsContainer from './components/PlaylistsContainer';
import SearchBarResults from './components/SearchBarResults';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import { myPlaylist, tracksList } from './persistence/playlists';
import { Playlist, ToggleMode, Track } from './model/CustomTypes';
import { isTrackInTracklist, subtractTracklist, filterTrackByQueryString, removeTrackFromTracklist } from './controller/TrackController';


function App() {

  const [searchString, setSearchString] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);

  /* const [searchBy, setSearchBy] = useState<string>(""); */


  useEffect(() => {
    setPlaylists([...myPlaylist]);
  }, []);

  useEffect(() => {

    let results = filterTrackByQueryString(tracksList, searchString);
    results = subtractTracklist(results, currentPlaylist?.tracks);

    setSearchResults(results);
  }, [searchString]);


  useEffect(() => {

    if(currentPlaylist === null){
      return;
    }
    console.log('Current playlist updated to: ', currentPlaylist);
    //console.log("Current playlist: ", currentPlaylist);
    /* console.log('Updating playlist: ', currentPlaylist.name);
    const tempPlaylists = [...playlists];
    const index = playlists.findIndex((p) => p.uid === currentPlaylist.uid);
    tempPlaylists[index] = currentPlaylist;
    setPlaylists(tempPlaylists); */

  }, [currentPlaylist]);

  

  const handleAddingTrack = (track: Track): void => {

    if(currentPlaylist === null){
      alert("Please select a playlist");
      return;
    }
    else if(isTrackInTracklist(track, currentPlaylist.tracks)){
      alert("This track is already in the playlist");
      return;
    }
    else {
      const tempPlaylist = {...currentPlaylist};
      console.log('Adding Track')
      console.log("Original playlist: ", currentPlaylist);
      //console.log("New playlist: ", tempPlaylist);

      tempPlaylist.tracks.push(track);
      setCurrentPlaylist(tempPlaylist);
    }
      
  }

  const handleRemovingTrack = (track: Track): void => {
    
    if(currentPlaylist === null){
      alert("Please select a playlist");
      return;
    }
    else if(!isTrackInTracklist(track, currentPlaylist.tracks)){
      alert("This track is not in the playlist");
      return;
    }
    else {
      const tempPlaylist = {...currentPlaylist};
      tempPlaylist.tracks = removeTrackFromTracklist(track, tempPlaylist.tracks);
      
      console.log('Removing Track')
      console.log("Original playlist: ", currentPlaylist);
      //console.log("New playlist: ", tempPlaylist);

      setCurrentPlaylist(tempPlaylist);
    }
  }


  const handleTogglingTrack = (track: Track, toggleMode: string): void => {
    console.log('Toggling track: ', track);
    console.log(currentPlaylist?.uid)
    if(currentPlaylist === null){
      alert("Please select a playlist");
      return;
    }

    //Create a copy of the current playlist
    const tempPlaylist = {...currentPlaylist};

    console.log('Removing track from playlist', tempPlaylist.tracks.length)

    switch(toggleMode){
      case 'add':
        tempPlaylist.tracks.push(track);
        break;
      case 'remove':
        tempPlaylist.tracks = removeTrackFromTracklist(track, tempPlaylist.tracks);
        break;
      default:
        alert("Invalid toggle mode");
        break;
    }
    
    console.log('Removed track from playlist', tempPlaylist.tracks.length)

    const index = playlists.findIndex((p) => p.uid === currentPlaylist.uid);
    const tempPlaylists = [...playlists];
    tempPlaylists[index] = tempPlaylist;
    
    setCurrentPlaylist(tempPlaylist);
  
  }

  return (
    <div className="App">
      <SearchBar searchString={searchString} setSearchString={setSearchString} />
      
      <SearchBarResults resultsToRender={searchResults} onToggle={handleTogglingTrack}/>
      <PlaylistsContainer currentPlaylist={currentPlaylist} playlists={playlists} setCurrentPlaylist={setCurrentPlaylist} onToggle={handleTogglingTrack}/>
    </div> 
  );
}

export default App;
