import { consumer_key, consumer_secret, access_token, access_token_secret, timeout_ms } from '../Config';
import Twit from 'twit';
// import io from 'socket.io-client';
// const io = require('socket.io');

const T = new Twit({
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
  timeout_ms
});

// const socket = io(`http://localhost:8000`);


// const port = 8000;
// socket.listen(port);

let oneDayAgo = new Date().getTime() - 86400000;
let twelveHoursAgo = new Date().getTime() - 43200000;
let tweets = {};

export const liveFeed = () => {
  let stream = T.stream('user', { with: ['coupleogoats'] });
  
  console.log('1. stream - ', stream);
  return new Promise((resolve, reject) => {
    stream.on('tweet', (tweet) => {
      console.log('2. liveFeed bout to send this thru socket emit -> ', tweet);
      tweets[tweet.id_str] = tweet.text;
      resolve(tweets);
      // return tweet;
    });  
  });

};

export const pastFeed = () => {
  T.get('statuses/user_timeline', { screen_name: 'CDCarter13', count: 20, exclude_replies: true, include_rts: false, trim_user: true}, (err, data, response) => {
    // console.log('fantasy lab status - ', data, response);
    var tweetsInLastHalfDay = [];
    // console.log('oneday ago - ', oneDayAgo);
    for (var i = 0; i < data.length; i++){
      var singleDate = new Date(data[i].created_at).getTime();
      console.log('singleDate - ', singleDate);
      if (singleDate > twelveHoursAgo){
        tweetsInLastHalfDay.push(data[i]);
      }
    }
    console.log('promise - ', io);
    console.log('pastFeed last day - ', tweetsInLastHalfDay);
    return tweetsInLastHalfDay
  });
};