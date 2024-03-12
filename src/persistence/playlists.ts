import { Track } from "../model/Track"; 
import { Playlist } from "../model/Playlist";


const playlists: Playlist[] = [
    {
        uid: "1",
        name: "Rock",
        tracks : [
            {
                id: "1",
                title: "Back in Black",
                artist: "AC/DC",
                album: "Back in Black",
                uri: "08mG3Y1vljYA6bvDt4Wqkj"
            }

        ]
    },
    {
        uid: "2",
        name: "Oasis",
        tracks : [

            {
                id: "6",
                title: "Wonderwall",
                artist: "Oasis",
                album: "What's the Story Morning Glory",
                uri: "4yBiZFLXn0n9AUJ5sWO88k"
            }

        ]
    },
    {
        uid: "3",
        name: "Queen",
        tracks : [

            {
                id: "8",
                title: "Bohemian Rhapsody",
                artist: "Queen",
                album: "A Night at the Opera",
                uri: "3z8h0TU7ReDPLIbEnYhWZb"
            }
            
        ]
    }
];



const tracksList: Track[] = [
    {
        id: "1",
      title: "Back in Black",
      artist: "AC/DC",
      album: "Back in Black",
      uri: "08mG3Y1vljYA6bvDt4Wqkj"
    },
    {
        id: "6",
        title: "Wonderwall",
        artist: "Oasis",
        album: "What's the Story Morning Glory",
        uri: "4yBiZFLXn0n9AUJ5sWO88k"
    },
    {
        id: "7",
        title: "Welcome to the Black Parade",
        artist: "My Chemical Romance",
        album: "The Black Parade",
        uri: "5wQnmLuC1W7ATsArWACrgW"
    },
    {
        id: "8",
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        uri: "3z8h0TU7ReDPLIbEnYhWZb"
    }
];


  
export { playlists, tracksList}