import React, { Component } from 'react';
import './app.css';
import Button from './Button';
import Score from './Score';
import Gameover from './Gameover';

function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  };

class App extends Component {
  state = {
    activeButton: '',
    buttonList: [],
    clicks : 0,
    showGameover: false,
    showStartgame: true
  }

timerId = undefined;
delay = 1000;

  clickButton = (btnId) => {
    //console.log("Click", btnId);
    if(!(btnId === this.state.buttonList[0])) {
      //game over
      this.gameover();
      return;
    }
    this.setState( prevState => {
      return {
      buttonList: prevState.buttonList.slice(1),
      clicks: prevState.clicks + 1
    };
  });
}
  gameover = () => {
    clearTimeout(this.timerId);
    this.setState({
      showGameover: true
    });
  }

  next = () => {
    //Check for Gameover
    if(this.state.buttonList.length >= 10) {
      this.gameover();
      return;
    }
    //next active Button
    let nextActive = (this.state.activeButton + getRandomInt(1,3)) % 4;

    let newList = this.state.buttonList;
    newList.push(nextActive);
    //update active button state
    this.setState({
      activeButton: nextActive,
      buttonList: newList
    });
    // set timer for next activation
    this.delay -= 10;
    this.timerId = setTimeout( this.next, this.delay);
  }

  startCallback = () => {
    this.setState({
      buttonList: [],
      newList: [],
      clicks : 0,
      showGameover: false,
      showStartgame: false,
      activeButton: getRandomInt(0,3),
    })
    this.delay= 1000;
    this.next();
  }

  scoreCallback = () => {
    return this.state.clicks;
  }

  render() {
    return (
      <div className="App">
        <Score score = { this.state.clicks } />
        <main className="button-container">
          <Button buttonColor='blue' active={ this.state.activeButton === 0 } clickHandler={ () => { this.clickButton(0); }}/>
          <Button buttonColor='yellow' active={ this.state.activeButton === 1 } clickHandler={ () => { this.clickButton(1); }}/>
          <Button buttonColor='green' active={ this.state.activeButton === 2 } clickHandler={ () => { this.clickButton(2); }}/>
          <Button buttonColor='red' active={ this.state.activeButton === 3 } clickHandler={ () => { this.clickButton(3); }}/>
          { this.state.showGameover && <Gameover scoreCallback={ this.scoreCallback } startCallback={ this.startCallback } /> }
        </main>
        { this.state.showStartgame && <button id="startgame" onClick={ this.startCallback }>New Game</button>}
      </div>
    );
  }
}

export default App;
