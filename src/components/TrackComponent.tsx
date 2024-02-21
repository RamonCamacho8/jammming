import React from "react";
import { Track } from "../lib/CustomTypes";


function TrackComponent(props: { track: Track }) {

    const { track } = props;


    return (
        <div>
        <h1>SearchBarResults</h1>
        </div>
    );
}

export default TrackComponent;