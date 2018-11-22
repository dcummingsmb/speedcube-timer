import React from 'react';
import './Timer.css';

/*
This Timer component can be re-used in any React app that needs a timer
*/

class Timer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startMs: 0,
      stopMs: 0,
      buffer: 1500,
      msElapsed: 0,
      timerRunning: false
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.stopTimer, false);
    document.addEventListener("keyup", this.handleKeyUp, false);
    document.addEventListener("touchstart", this.stopTimer, false);
    document.addEventListener("touchend", this.startTimer, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.stopTimer, false);
    document.removeEventListener("keyup", this.handleKeyUp, false);
    document.removeEventListener("touchstart", this.stopTimer, false);
    document.removeEventListener("touchend", this.startTimer, false);
  }

  getMilliseconds = () => {
    return this.state.msElapsed % 1000;
  }

  getSeconds = () => {
    return Math.floor(this.state.msElapsed / 1000) % 60;
  }

  getMinutes = () => {
    return Math.floor(this.state.msElapsed / 1000 / 60) % 60;
  }

  formatTime = () => {
    let formattedTime = ('0' + this.getSeconds()).slice(-2) + '.' + ('00' + this.getMilliseconds()).slice(-3);
    if (this.getMinutes()) {
      formattedTime = ('0' + this.getMinutes()).slice(-2) + ':' + formattedTime;
    }
    return formattedTime;
  }

  //May need other handlers on keydown and touchstart if functionality is expanded to include inspection time.

  //Handler needed here to catch the space bar on keyup event before starting timer.
  handleKeyUp = (event) => {
    if (!this.state.timerRunning && event.which === 32) {
      this.startTimer();
    }
  }

  startTimer = () => {
    let _this = this; //to keep reference to state inside interval function
    if(!this.state.timerRunning && (Date.now() - this.state.stopMs > this.state.buffer)){
      this.setState({msElapsed: 0, timerRunning: true, startMs: Date.now()});      
      this.incrementer = setInterval(() => {
        _this.setState({msElapsed: Date.now() - _this.state.startMs});
      }, 1);
    }
  }

  stopTimer = () => {
    if (this.state.timerRunning){
      clearInterval(this.incrementer);
      this.setState({timerRunning: false, stopMs: Date.now()})
      this.returnResult();
    }    
  }

  returnResult = () => {
    /*------------------------------------------------
    This is where you can return msElapsed via a
    props function passed in from App.js
    Then App.js can delegate what to do with it
    */
  }

  render () {
    return(
      <div className='container'>
        <div className='timerBox'>
          <h1 className='timerText'>{this.formatTime()}</h1>
          <p>Spacebar to start. Any key to stop.</p>
          <p>(Tap on mobile/touchscreen)</p>
        </div>
      </div>
    );
  }
}

export default Timer;