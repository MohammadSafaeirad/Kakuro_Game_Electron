const { contextBridge } = require('electron');
const fs = require('fs');

//uses the apis of lin, win, and part
contextBridge.exposeInMainWorld('api', {
    //lin: appends a string message to a log file, appendFileSync is a method in node.js
    lin: (msg) => fs.appendFileSync('/home/trackerR324/log.txt', msg),
    //win: appends messages to a log file on a windows system
    win: (msg) => fs.appendFileSync('C:/trackerR324/log.txt', msg),
    //part: placeholder 
    part: async () => {
        // You might need to use ipcRenderer to communicate with the main process
        const result = await window.api.invoke('returnParticipants');
        return result;
    },
});

