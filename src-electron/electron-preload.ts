
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    invoke: (channel: any, data: any) => ipcRenderer.invoke(channel, data),
    on: (channel: any, func: any) => ipcRenderer.on(channel, (event, ...args) => func(...args))
});