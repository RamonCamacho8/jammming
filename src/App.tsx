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
  }, [searchString, currentPlaylist, playlists]);

  const addTrackToCurrent = (track: Track) => {
    if(currentPlaylist){
      console.log("Adding track to current playlist");
      const index = playlists.findIndex((p: Playlist) => p.uid === currentPlaylist.uid);
      playlists[index].tracks.push(track);
      setPlaylists([...playlists]);
    }
  }

  const removeTrackFromCurrent = (track: Track) => {
    if(currentPlaylist){
      console.log("Removing track from current playlist");
      const index = playlists.findIndex((p: Playlist) => p.uid === currentPlaylist.uid);
      playlists[index].tracks = removeTrackFromTracklist(track, playlists[index].tracks);
      setPlaylists([...playlists]);
    }
  }

  const handlePlaylistRename = (playlist: Playlist, newName: string) => {
    const index = playlists.findIndex((p: Playlist) => p.uid === playlist.uid);
    playlists[index].name = newName;
    setPlaylists([...playlists]);
  }


  return (
    <div className="App">
      <SearchBar searchString={searchString} setSearchString={setSearchString} />
      
      <SearchBarResults resultsToRender={searchResults} onToggle={addTrackToCurrent}/>
      <PlaylistsContainer currentPlaylist={currentPlaylist} playlists={playlists}
                          setCurrentPlaylist={setCurrentPlaylist} onToggle={removeTrackFromCurrent}
                          onRename={handlePlaylistRename}/>
    </div> 
  );
}

export default App;
