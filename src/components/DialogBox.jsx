import React from "react";

class DialogBox extends React.Component {

    constructor(props) {
        super(props);
    }

    // Ok, so this is kind of sketchy, but for right now we're going to let Bootstrap+jQuery continue to manage the modal DOM.
    // Another option, the "React way", would be to accept a "visible" prop, and then return the modal or null based on that.
    // However, I want to get as close as possible to the original look and feel, so I'll leave it as-is for now.

    render() {

        const chooseX = () => { this.props.chooseMark('X') };
        const chooseO = () => { this.props.chooseMark('O') };

        return (
            <div id="dialog" className="modal fade" tabIndex="-1" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Tic Tac Toe</h4>
                        </div>
                        <div className="modal-body">
                            <p>Please choose your side.</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={chooseX} id="playerX" type="button" className="btn btn-default" data-dismiss="modal"><i className="fa fa-times fa-3x" aria-hidden="true"></i></button>
                            <button onClick={chooseO} id="playerO" type="button" className="btn btn-default" data-dismiss="modal"><i className="fa fa-circle-o fa-3x" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = DialogBox;