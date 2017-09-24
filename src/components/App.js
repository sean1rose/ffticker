import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ipcRenderer } from "electron";
import { consumer_key, consumer_secret, access_token, access_token_secret, timeout_ms } from '../../Config';
import Twit from 'twit';

// import { liveFeed, pastFeed } from '../services/news';

import Header from "./Header";

const T = new Twit({
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
  timeout_ms
});


// const APP_DATA = JSON.parse(localStorage.getItem("__INITIAL_STATE__"));


const INITIAL_STATE = {
  finalTweets: [],
  tweetObj: {}
};

let stream = T.stream('user', { with: ['coupleogoats'] });

class App extends Component {
  static defaultProps = {
    updateTrayText: () => {},
    onTimerExpire: () => {}
  };

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.onAppClose();
  }

  // --------------------------------------------------
  // -------- electron event handlers -----------------
  // --------------------------------------------------

  onAppClose = () => {

  };

  // called every second w/ updated time
  // updateTrayText = title => {
  //   ipcRenderer.send("update-timer", title);
  // };

  // once timer expired -> clear text in timer
  // timerHasExpired = () => {
  //   // semd empty string to clean out text
  //   ipcRenderer.send("update-timer", "");
  // };

  // -------- end of electron event handerls ----------

  componentDidMount() {
    // this.initializeTimer();

    stream.on('tweet', (tweet) => {
      console.log('1 finaltwtt b4 - ', this.state.finalTweets, this.state.tweetObj);
      console.log('2. liveFeed bout to send this thru socket emit -> ', tweet);      
      this.setState({
        finalTweets: [...this.state.finalTweets, tweet.text],
        tweetObj: {
          ...this.state.tweetObj,
          [tweet.id_str]: tweet.text
        }
      });
      console.log('3 state - ', this.state.finalTweets, this.state.tweetObj);
    });  

  }

  componentDidUpdate() {
    // localStorage.setItem("__INITIAL_STATE__", JSON.stringify(this.state));
  }


  render() {
    return (
      <div>
        <Header />
        HELLO
      </div>
    );
  }
}

const styles = {
  container: {
    height: "88vh"
  }
};

export default App;
