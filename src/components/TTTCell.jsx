import React from "react";

const TTTCell = (props) => {

    let markup = "";
    if (String(props.mark).toLowerCase() == "x") {
        markup = <h1><i className="fa fa-times" aria-hidden="true"></i></h1>;
    } else if (String(props.mark).toLowerCase() == "o") {
        markup = <h1><i className="fa fa-circle-o" aria-hidden="true"></i></h1>;
    }

    let classList = props.className;
    if (Array.isArray(props.winningSpaces) && props.winningSpaces.indexOf(props.position) != -1) {
        classList += " winner";
    }

    return (
        <td className={classList} onClick={() => {props.clickHandler(props.position);}}>{markup}</td>
    );
};

module.exports = TTTCell;