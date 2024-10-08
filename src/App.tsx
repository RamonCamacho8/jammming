import React, { useCallback, useEffect } from 'react';
import './App.css';
import PlaylistsContainer from './components/PlaylistsContainer';
import SearchBarResults from './components/SearchBarResults';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import { Playlist } from './model/Playlist';
import { Track } from './model/Track';
import { subtractTracklist, filterTrackByQueryString, removeTrackFromTracklist } from './controller/TrackController';
import { Spotify } from './util/Spotify';

import { searchTracks } from './controller/TrackController';
import { getPlaylists } from './controller/PlaylistController';
import { getUrisFromTracks } from './controller/TrackController';

function App() {

  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [displayedSearchResults, setDisplayedSearchResults] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    Spotify.getAccessToken();
    Spotify.getUserInfo();
  }, []);

  useEffect(() => {
    if (currentPlaylist) {
      console.log("Current playlist changed", currentPlaylist);
      let results = subtractTracklist(searchResults, currentPlaylist.tracks);
      setDisplayedSearchResults(results);
    } else {
      setDisplayedSearchResults(searchResults);
    }

  }, [currentPlaylist, searchResults]);


  const search = useCallback((searchString: string) => {
    searchTracks(searchString).then(
      (tracks: Track[]) => {
        setSearchResults(tracks);
        if (currentPlaylist) {
          let results = filterTrackByQueryString(tracks, searchString);
          results = subtractTracklist(results, currentPlaylist.tracks);
          setDisplayedSearchResults(results);
        }
        else {
          setDisplayedSearchResults(tracks);
        }
      }
    );
  }, [currentPlaylist]);

  const loadPlaylists = useCallback(() => {
    getPlaylists().then(setPlaylists);
  }, []);


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
    console.log("Saving playlist to Spotify", playlist);
    const uris = getUrisFromTracks(playlist.tracks);
    Spotify.savePlaylist(playlist.uid, uris, playlist.name);
  }


  return (
    <div className="flex justify-center items-center bg-slate-50 dark:bg-slate-900 dark:text-slate-50 text-slate-800 w-svw h-svh" >
      <div className='grid gap-4 grid-cols-2 grid-rows-10 container rounded-md p-10 h-4/5 dark:bg-slate-800 bg-slate:50'  >
        <SearchBar onSearch={search} />
        <SearchBarResults resultsToRender={displayedSearchResults} onToggle={addTrackToCurrent} />
        <PlaylistsContainer currentPlaylist={currentPlaylist} playlists={playlists}
          setCurrentPlaylist={setCurrentPlaylist} onToggle={removeTrackFromCurrent}
          onRename={handlePlaylistRename}
          onSave={savePlaylistToSpotify} />
          <div className='dark:bg-slate-700 rounded-md flex justify-center items-center col-span-2 '>
            <button className='p-2 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-md' onClick={loadPlaylists}>Load playlists</button>
          </div>
          
      </div>
    </div>
  );
}

export default App;
