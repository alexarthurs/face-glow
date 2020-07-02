import { app, BrowserWindow } from 'electron'
const Store = require('electron-store');

const store = new Store({
	defaults: {
		width: 1000,
		height: 600,
		color: "#5d3fdd"
	}
});

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
	? `http://localhost:9080`
	: `file://${__dirname}/index.html`

function createWindow() {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		width: store.get('width'),
		height: store.get('height'),
		x: store.get('x'),
		y: store.get('y'),
		frame: process.platform !== "win32",
		backgroundColor: '#000',
		webPreferences: {
			nodeIntegration: true,
			devTools: process.env.NODE_ENV === 'development'
		},
		icon: __static + '/icon.png',
	});

	mainWindow.loadURL(winURL)

	mainWindow.on('resize', () => {
		let { width, height } = mainWindow.getBounds();
		store.set('width', width);
		store.set('height', height);
	});

	mainWindow.on('move', () => {
		let { x, y } = mainWindow.getBounds();
		store.set('x', x);
		store.set('y', y);
	});

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})
