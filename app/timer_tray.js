const electron = require('electron');
// Tray = base class that we want to extend and add add'l behavior to...
const { Tray, app, Menu } = electron;

// subclass the tray
class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    // super calls parent constructor (inherit base class properties)
      // assume that we're passing in iconPath whenever we create an instance of TimerTray 
    super(iconPath);

    this.mainWindow = mainWindow;
    // set up on click handler as soon as instance is created 

    // setToolTip method already defined on native electron Tray class
    this.setToolTip('Timer App');

    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));

  }

  // whenever user clicks on tray icon -> want to toggle visibility of main window (show window if not already doing so)
  onClick(event, bounds) {
    // console.log('bounds - ', bounds.x, bounds.y);
    // click event bounds (where status tray icon is located)...
    const { x, y } = bounds;
    // height/width dimensions of window itself; dynamically calculate bounds on the fly (and not hardcoded) so that it works even if user resizes window - will get updated height and width
    const { height, width } = this.mainWindow.getBounds(); 

    const yPosition = process.platform === 'darwin' ? y : (y - height);
    // dynamically set pos of window (also dimensions)
    this.mainWindow.setBounds({
      x: x - (width / 2),
      y: yPosition,
      height,
      width
    });
    // ^ set size of window before display it
    // this.mainWindow.isAlwaysOnTop();
    this.mainWindow.show();


    // if (this.mainWindow.isVisible()){
      
    //   this.mainWindow.hide();
    // } else {
    //   const yPosition = process.platform === 'darwin' ? y : (y - height);
    //   // dynamically set pos of window (also dimensions)
    //   this.mainWindow.setBounds({
    //     x: x - (width / 2),
    //     y: yPosition,
    //     height,
    //     width
    //   });
    //   // ^ set size of window before display it
    //   // this.mainWindow.isAlwaysOnTop();
    //   this.mainWindow.show();
    // }
  }
  /*
  y position of window == click event of y direction bounds (0) == want window to touch status bar at top
  x position of window == (click event of x direction bounds) - (1/2 of window bounds value)
    - need to subtract 1/2 so that window is centered underneath the icon (otherwise window would start at click value of x, and not be centered at click value of x)
  */

  onRightClick() {
    // build menu template then tell TimerTray to display...
      // pass in array w/ visible options
    const menuConfig = Menu.buildFromTemplate([
      { 
        label: 'Quit',
        click: () => app.quit()
      }
    ]);

    // associate menu w/ tray icon...
      // method available on base Tray class
    this.popUpContextMenu(menuConfig)
  }
}

module.exports = TimerTray;