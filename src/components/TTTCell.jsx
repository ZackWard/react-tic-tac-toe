import React from "react";

const TTTCell = (props) => {

    let markup = "";
    if (String(props.mark).toLowerCase() == "x") {
        markup = <h1><i className="fa fa-times" aria-hidden="true"></i></h1>;
    } else if (String(props.mark).toLowerCase() == "o") {
        markup = <h1><i className="fa fa-circle-o" aria-hidden="true"></i></h1>;
    }

    return (
        <td className={props.className} onClick={() => {props.clickHandler(props.position)}}>{markup}</td>
    );
};

module.exports = TTTCell;