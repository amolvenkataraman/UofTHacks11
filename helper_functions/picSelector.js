const fs = require('fs').promises;
const path = require('path');

var usedFiles = {};
var usedCounter = 0;

// async function renameFiles() {
//     const directory = __dirname + '/../Pics';
//     const files = await fs.readdir(directory);

//     for (let i = 0; i < files.length; i++) {
//         const oldPath = path.join(directory, files[i]);
//         const newPath = path.join(directory, `${i}.png`); // Assuming all files are .png
//         await fs.rename(oldPath, newPath);
//     }

//     return files.length;
// }

async function selectRandomFile() {
    const directory = __dirname + '/../Pics';
    const files = await fs.readdir(directory);
    const randomFile = files[Math.floor(Math.random() * files.length)];

    if (usedCounter == files.length) {
        return null;
    }

    if (usedFiles[randomFile]) {
        return selectRandomFile();
    }

    usedFiles[randomFile] = true;
    usedCounter++;

    return randomFile;
    
} 
  
  // Export the function
  module.exports = { selectRandomFile };