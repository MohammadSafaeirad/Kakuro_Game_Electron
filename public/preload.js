const { contextBridge } = require('electron');
const fs = require('fs');

contextBridge.exposeInMainWorld('api', {
    lin: (msg) => fs.appendFileSync('/home/trackerR324/log.txt', msg),
    win: (msg) => fs.appendFileSync('C:/trackerR324/log.txt', msg),
    part: async () => {
        // You might need to use ipcRenderer to communicate with the main process
        const result = await window.api.invoke('returnParticipants');
        return result;
    },
});
