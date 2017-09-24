// bootstrap electron app and create browser window...
const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/timer_tray.js');
const MainWindow = require('./app/main_window.js');


const { app, ipcMain } = electron;

let mainWindow;
let tray;

// 1) as soon as app is ready -> create our main window
app.on('ready', () => {
  // hide dock icon
  app.dock.hide();
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);
  // ^ pass in arg -> load url for browserwindow to look at (in our case, the webpack-bundled react web app)

  // determine platform to display correct tray icon
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';

  // path.join -> used to take 2 different paths and join them together
  // 1st arg: __dirname --> reference to current working directory
  // 2nd arg: provide path to get to icon 
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  // take icon path and create instance of tray constructor (for tray icon)
  tray = new TimerTray(iconPath, mainWindow);

  // can u make it show/display when a new notification/msg only? - so it pops up if there's a breaking new news item

});

ipcMain.on("update-timer", (event, timeLeft) => {
  // need time left to show up on status tray icon
  tray.setTitle(timeLeft);
});