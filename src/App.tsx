import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import PlaylistsContainer from './components/PlaylistsContainer';
import SearchBarResults from './components/SearchBarResults';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import { ownnedPlaylists, resultTracksList, tracksList } from './persistence/playlists';
import { Playlist, Track } from './model/CustomTypes';


function App() {

  const [searchString, setSearchString] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    setPlaylists(ownnedPlaylists);
    setSearchResults(resultTracksList);
  }, []);

  useEffect(() => {
    const results = tracksList.filter((track: Track) => {
      return track.title.toLowerCase().includes(searchString.toLowerCase());
    });
    setSearchResults(results);
  }, [searchString]);

  useEffect(() => {
    console.log("Current playlist: ", currentPlaylist);
  }, [currentPlaylist]);

  const isTrackInList = (track: Track, list: Track[]): boolean => {
    return list.some((t: Track) => t.uid === track.uid);
  }
  

  const handleAddingTrack = (track: Track): void => {

    if (isTrackInList(track, selectedTracks)) {
      //alert("Track already added");
      return;
    } else {
      setSelectedTracks([...selectedTracks, track]);
    }

  }


  return (
    <div className="App">
      <SearchBar searchString={searchString} setSearchString={setSearchString} />
      <SearchBarResults results={searchResults} addToPlaylists={handleAddingTrack} />
      <PlaylistsContainer playlists={playlists} selectedTracks={selectedTracks} setCurrentPlaylist={setCurrentPlaylist} currentPlaylist={currentPlaylist} />
    </div>
  );
}

export default App;
