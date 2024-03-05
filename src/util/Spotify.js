import { generateRandomString } from "./randomString";
import { client_id_env } from "../envs";
let client_id = client_id_env // this is replaced with a wrong client id to avoid misuse of the client id

let redirect_uri = "http://localhost:3000/";
let state = generateRandomString(16);
let accessToken;
let userURI;
localStorage.setItem("stateKey", state);
let scope = "user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private";

let url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);

const searchEndpoint = "https://api.spotify.com/v1/search"

export const Spotify = {

    isAccessToken(){
        if(accessToken){
            return true;
        }
        return false;
    }, 

    getAccessToken() {
        
        if(accessToken){
            //console.log('Already have an access token!')
            return accessToken;
        }
            
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
            return accessToken;
        } else {
            window.location = url;
        }
    },

    async searchForTracks(term) {

        console.log('searching for tracks')
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await fetch(`${searchEndpoint}?q=${term}&type=track`, { headers: headers });
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items;

    },

    async savePlaylist(name, trackUris) {

        if (!name || !trackUris.length) {
          return;
        }
    
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        /* let userId;
    
        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
          userId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: name})
          }).then(response => response.json()
          ).then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({uris: trackUris})
            });
          });
        }); */

        const response = await fetch(`${searchEndpoint}?q=${term}&type=track`, { headers: headers });
        const jsonResponse = await response.json();
        const userId = jsonResponse.id;
        

    },
    async getUserID() {
        console.log('getting user id')
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await fetch('https://api.spotify.com/v1/me', { headers: headers });
        const jsonResponse = await response.json();
        return jsonResponse.id;
    },
    

    async getUserInfo() {

        //console.log('getting user info')
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await fetch('https://api.spotify.com/v1/me', { headers: headers });
        const jsonResponse = await response.json();
        userURI = jsonResponse.uri;
        //console.log(userURI)
        return jsonResponse;
    },

    async getUserPlaylists() {
        console.log('getting user playlists')
        
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await fetch('https://api.spotify.com/v1/me/playlists?offset=0&limit=20', { headers: headers });
        const jsonResponse = await response.json();
        console.log(jsonResponse.items)
        //debugger;
        return jsonResponse.items;

    },
    
    async getUserCreatedPlaylists() {

        console.log('getting user created playlists')
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await fetch('https://api.spotify.com/v1/me/playlists?offset=0&limit=20', { headers: headers });
        const jsonResponse = await response.json();
        let playlists = jsonResponse.items;
        return playlists.filter(playlist => playlist.owner.uri === userURI);
    }
    ,

    async getPlaylistById(playlistId) {
        console.log('getting playlist by id')
        const fields = 'tracks.items(track(name,id,uri,album(name),artists.name))'
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}?fields=${fields}`, { headers: headers });
        const jsonResponse = await response.json();
        return jsonResponse;
    },

    async getTracksInPlaylist(href) {
        //console.log('getting tracks in playlist')
        const fields = '?fields=items(track(name,id,uri,album(name),artists.name))'

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await fetch(href + fields, { headers: headers });
        const jsonResponse = await response.json();
        //console.log(jsonResponse)
        return jsonResponse;
    },

    async savePlaylist(playlistId, trackUris) {
        console.log('saving playlist', playlistId)
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        const userId = await Spotify.getUserID();
        const uris = 'uris=' + trackUris.join(',');
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?${uris}`, { headers: headers, method: 'PUT' });
        const jsonResponse = await response.json();
        console.log(jsonResponse)
    }


}