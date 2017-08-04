import React from "react";

export const FailNotification = props => {

    let failStyle = {
        opacity: 0
    };

    if (props.winner != null && props.winner != props.player) {
        failStyle.opacity = 0.85;
    }

    return (
        <div id="failNotification" style={failStyle}>
            <video loop muted autoPlay className="failVideo">
                <source src={props.failGif} type="video/mp4" />
            </video>
            <p>Fail notification image: {props.failGif}</p>
        </div>
    );
};