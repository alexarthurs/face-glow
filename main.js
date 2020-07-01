// ./main.js
const { app, BrowserWindow } = require('electron')
const Store = require('electron-store');
const store = new Store({
	defaults: {
		width: 1000,
		height: 600,
		color: "#4900F1C7"
	}
});

let win = null;

app.on('ready', function () {

	// Initialize the window to our specified dimensions
	win = new BrowserWindow({
		width: store.get('width'),
		height: store.get('height'),
		x: store.get('x'),
		y: store.get('y'),
		frame: false,
		backgroundColor: '#000',
		webPreferences: {
			nodeIntegration: true,
			devTools: false
		}
	});

	// Specify entry point to default entry point of vue.js
	win.loadURL('http://localhost:8686');

	// Remove window once app is closed
	win.on('closed', function () {
		win = null;
	});

	win.on('resize', () => {
		let { width, height } = win.getBounds();
		store.set('width', width);
		store.set('height', height);
	});

	win.on('move', () => {
		let { x, y } = win.getBounds();
		store.set('x', x);
		store.set('y', y);
	});

});
//create the application window if the window variable is null
app.on('activate', () => {
	if (win === null) {
		createWindow()
	}
})
//quit the app once closed
app.on('window-all-closed', function () {
	if (process.platform != 'darwin') {
		app.quit();
	}
});