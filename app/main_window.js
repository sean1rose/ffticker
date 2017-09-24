const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(url){
    // call in super and pass in options to super
    super({
      height: 500,
      width: 500,
      frame: false,
      resizable: false,
      show: false, // whether to show when created
      closable: false,
      webPreferences: { backgroundThrottling: false }
    });

    this.loadURL(url);
    // this.on('blur', this.onBlur.bind(this));
  }

  // onBlur() {
  //   // event handler (blur is triggered when user clicks away)
  //   this.hide();
  // }
}

module.exports = MainWindow;