import { generateRandomString } from "./randomString";
import { client_id_env } from "../envs";
let client_id = client_id_env // this is replaced with a wrong client id to avoid misuse of the client id

let redirect_uri = "http://localhost:3000/";
let state = generateRandomString(16);
let accessToken;
localStorage.setItem("stateKey", state);
let scope = "user-read-private user-read-email";

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
            console.log('Already have an access token!')
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

    }
}