import React, { useEffect } from 'react';
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

  useEffect(() => {
    setPlaylists([...myPlaylist]);
  }, []);

  useEffect(() => {

    let results = filterTrackByQueryString(tracksList, searchString);
    if(currentPlaylist)
      results = subtractTracklist(results, currentPlaylist.tracks);
    setSearchResults(results);
  }, [searchString, currentPlaylist]);

  const addTrackToCurrent = (track: Track) => {
    if(currentPlaylist){
      console.log("Adding track to current playlist");
      const newTracks = [...currentPlaylist.tracks, track];
      setCurrentPlaylist({...currentPlaylist, tracks: newTracks}); 
    }
  }

  const removeTrackFromCurrent = (track: Track) => {
    if(currentPlaylist){
      console.log("Removing track from current playlist");
      const newTracks = removeTrackFromTracklist(track, currentPlaylist.tracks);
      debugger;
      const newPlaylist = {...currentPlaylist, tracks: newTracks};
      setCurrentPlaylist(newPlaylist);
    }
  }

  useEffect(() => {
     
    if(currentPlaylist){
      console.log("Current playlist changed"); 
      const index = playlists.findIndex((p: Playlist) => p.uid === currentPlaylist.uid);
      let tempPlaylists = [...playlists];
      tempPlaylists[index] = currentPlaylist as Playlist;
      setPlaylists(tempPlaylists);
    }

  }, [currentPlaylist]);



  return (
    <div className="App">
      <SearchBar searchString={searchString} setSearchString={setSearchString} />
      
      <SearchBarResults resultsToRender={searchResults} onToggle={addTrackToCurrent}/>
      <PlaylistsContainer currentPlaylist={currentPlaylist} playlists={playlists} setCurrentPlaylist={setCurrentPlaylist} onToggle={removeTrackFromCurrent}/>
    </div> 
  );
}

export default App;
