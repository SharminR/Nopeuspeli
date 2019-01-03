import React, { Component } from "react";
import "./gameover.css";
import "./app.css";

class Gameover extends Component {
  render() {
    const score = this.props.scoreCallback();

    return (
      <div id="overlay">
        <div id="gameover">
          Game Over! <br />
          Your score: <br />
          {score}
          <button id="startgame" onClick={this.props.startCallback}>
            New Game
          </button>
        </div>
      </div>
    );
  }
}

export default Gameover;
