import React from "react";

class Nav extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Tic Tac Toe</a>
                    </div>
                    <div className="collapse navbar-collapse" id="main-navbar">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="http://www.zackward.net">Home</a></li>
                            <li><a href="https://github.com/ZackWard/zackward.github.io/tree/master/projects/tic-tac-toe">Source <i className="fa fa-github" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

module.exports = Nav;