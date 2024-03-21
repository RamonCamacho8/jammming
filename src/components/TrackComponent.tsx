import React from "react";
import { Track } from "../model/Track";


function TrackComponent(props: { track: Track, toggleString: string, onToggle: (track: Track) => void}) {

    const { track, toggleString, onToggle } = props;


    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onToggle(track);
    }

    return (
        <div className="flex flex-row w-full justify-between my-2 border-b-2 border-slate-400">
            <div className="flex flex-col w-full">
                <h4 className="font-medium w-full">{track.title}</h4>
                <p className="text-slate-400" >{track.artist}</p>
                <p className="text-slate-400 overflow-hidden h-6" >{track.album}</p>
            </div>
            
            <div className="flex flex-col justify-center">
                { toggleString === 'add' && 
                    <button className="bg-green-600 h-10 w-10 p-2 ml-1 rounded" onClick={(e) => handleClick(e)}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                }
                { toggleString === 'remove' && 
                    <button className="bg-red-600 h-10 w-10 p-2 ml-1 rounded " onClick={(e) => handleClick(e)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                }
            </div>
            
        </div>
    );
}

export default TrackComponent;