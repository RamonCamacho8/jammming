import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import PlaylistsContainer from './components/PlaylistsContainer';
import SearchBarResults from './components/SearchBarResults';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import { myPlaylist, tracksList } from './persistence/playlists';
import { Playlist, Track } from './model/CustomTypes';
import { isTrackInTracklist, subtractTracklist, filterTrackByQueryString } from './controller/TrackController';


function App() {

  const [searchString, setSearchString] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);

  /* const [searchBy, setSearchBy] = useState<string>(""); */


  useEffect(() => {
    setPlaylists(myPlaylist);
  }, []);

  useEffect(() => {

    const results = filterTrackByQueryString(tracksList, searchString);

    setSearchResults(results);
  }, [searchString]);

  useEffect(() => {
    console.log("Current playlist: ", currentPlaylist);
    console.log("Playlists: ", playlists) ; 
    

    if(currentPlaylist === null){
      return;
    } else {
      const tempPlaylists = [...playlists];
      const index = tempPlaylists.findIndex((playlist) => playlist.uid === currentPlaylist.uid);
      tempPlaylists[index] = currentPlaylist;
      setPlaylists(tempPlaylists);
    }

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
      tempPlaylist.tracks = tempPlaylist.tracks.filter((t) => {return t.uid !== track.uid});
      console.log(tempPlaylist.tracks);
      setCurrentPlaylist(tempPlaylist);
    }
  }

  
  useEffect(() => {
    if(currentPlaylist === null){
      return;
    }
    const tempPlaylists = [...playlists];
    const index = playlists.findIndex((p) => p.uid === currentPlaylist.uid);
    tempPlaylists[index] = currentPlaylist;
    setPlaylists(tempPlaylists);

  }, [currentPlaylist]);

  const handlePlaylistNameChange = (newName: string, playlist:Playlist): void => {

    const tempPlaylists = [...playlists];
    const index = tempPlaylists.findIndex((p) => p.uid === playlist.uid);
    tempPlaylists[index].name = newName;
    setPlaylists(tempPlaylists);

  }


  return (
    <div className="App">
      <SearchBar searchString={searchString} setSearchString={setSearchString} />
      <SearchBarResults resultsToRender={subtractTracklist(searchResults, currentPlaylist?.tracks)} addToPlaylists={handleAddingTrack} />
      <PlaylistsContainer playlists={playlists} onNameChange={handlePlaylistNameChange}  setCurrentPlaylist={setCurrentPlaylist} currentPlaylist={currentPlaylist} removeFromPlaylist={handleRemovingTrack} />
    </div> 
  );
}

export default App;
