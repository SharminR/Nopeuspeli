import React, { Component } from 'react';
import './score.css';

class Score extends Component { this
  render() {
    return(
      <div id="score-container">Score: { this.props.score }</div>
    );
  }
}

export default Score;
