import { Playlist, Track } from "../model/CustomTypes"; 


const ownnedPlaylists: Playlist[] = [
    {
        "uid": "1",
        "name": "Rock",
        "tracks" : [
            {
                "uid": "1",
                "title": "Back in Black",
                "artist": "AC/DC",
                "album": "Back in Black"
            },
            {
                "uid": "2",
                "title": "Highway to Hell",
                "artist": "AC/DC",
                "album": "Highway to Hell"
            },
            {
                "uid": "3",
                "title": "Thunderstruck",
                "artist": "AC/DC",
                "album": "The Razors Edge"
            }
        ]
    }
];



const resultTracksList: Track[] = [
    {
      uid: "1",
      title: "Back in Black",
      artist: "AC/DC",
      album: "Back in Black",
    }
];


const tracksList: Track[] = [
    {
        uid: "1",
      title: "Back in Black",
      artist: "AC/DC",
      album: "Back in Black",
    },
    {
        uid: "2",
      title: "Highway to Hell",
      artist: "AC/DC",
      album: "Highway to Hell",
    },
    {
        uid: "3",
      title: "Thunderstruck",
      artist: "AC/DC",
      album: "The Razors Edge",
    },
    {
        uid: "4",
      title: "Hells Bells",
      artist: "AC/DC",
      album: "Back in Black",
    },
    {
        uid: "5",
      title: "You Shook Me All Night Long",
      artist: "AC/DC",
      album: "Back in Black",
    },
    {
        uid: "6",
        title: "Wonderwall",
        artist: "Oasis",
        album: "What's the Story Morning Glory",
    },
    {
        uid: "7",
        title: "Black Parade",
        artist: "My Chemical Romance",
        album: "The Black Parade",
    },
    {
        uid: "8",
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
    },
    {
        uid: "9",
        title: "Another One Bites the Dust",
        artist: "Queen",
        album: "The Game",
    },
    {
        uid: "10",
        title: "We Will Rock You",
        artist: "Queen",
        album: "News of the World",
    },
    {
        uid: "11",
        title: "We Are the Champions",
        artist: "Queen",
        album: "News of the World",
    },
    {
        uid: "12",
        title: "Radio Ga Ga",
        artist: "Queen",
        album: "The Works",
    },
    {
        uid: "13",
        title: "I Want to Break Free",
        artist: "Queen",
        album: "The Works",
    },

];


  
export { ownnedPlaylists, resultTracksList, tracksList}