import React, { useCallback, useEffect } from 'react';
import './App.css';
import PlaylistsContainer from './components/PlaylistsContainer';
import SearchBarResults from './components/SearchBarResults';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import { playlists, tracksList } from './persistence/playlists';
import { Playlist } from './model/Playlist';
import { Track } from './model/Track';
import { subtractTracklist, filterTrackByQueryString, removeTrackFromTracklist } from './controller/TrackController';
import { Spotify } from './util/Spotify';

import { searchTracks } from './controller/TrackController';
import { getPlaylists } from './controller/PlaylistController';

function App() {

  //const [searchString, setSearchString] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    /* setPlaylists([...playlists]); */
    Spotify.getAccessToken();
    Spotify.getUserInfo();
  }, []);


  const search = useCallback((searchString: string) => {
    searchTracks(searchString).then(setSearchResults);
  }, []);

  const loadPlaylists = useCallback(() => {
    getPlaylists().then(setPlaylists);
  }, []);

  /* useEffect(() => {

    let results = filterTrackByQueryString(tracksList, searchString);
    if (currentPlaylist)
      results = subtractTracklist(results, currentPlaylist.tracks);
    setSearchResults(results);

  }, [searchString, currentPlaylist, playlists]); */

  const addTrackToCurrent = (track: Track) => {
    if (currentPlaylist) {
      console.log("Adding track to current playlist");
      const index = playlists.findIndex((p: Playlist) => p.uid === currentPlaylist.uid);
      playlists[index].tracks.push(track);
      setPlaylists([...playlists]);
    }
  }

  const removeTrackFromCurrent = (track: Track) => {
    if (currentPlaylist) {
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

  const savePlaylistToSpotify = (playlist: Playlist) => {
    console.log("Saving playlist to Spotify");
  }



  return (
    <div className="App">
      <SearchBar onSearch={search} />

      <SearchBarResults resultsToRender={searchResults} onToggle={addTrackToCurrent} />
      <PlaylistsContainer currentPlaylist={currentPlaylist} playlists={playlists}
        setCurrentPlaylist={setCurrentPlaylist} onToggle={removeTrackFromCurrent}
        onRename={handlePlaylistRename}
        onSave={savePlaylistToSpotify} />
        <button onClick={loadPlaylists}>Load playlists</button>
    </div>
  );
}

export default App;
