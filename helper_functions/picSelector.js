const fs = require('fs').promises;
const path = require('path');

var usedFiles = {};
var usedCounter = 0;

var photoInfo = {
    "IMG_20200602_174653.jpg": {
        latitude: 43.78587722,
        longitude: -79.32217406,
        date: "2020-06-02"
    },
    "IMG_20220721_070441198.jpg": {
        latitude: 13.07863500,
        longitude: 80.26287997,
        date: "2022-07-21"
    },
    "IMG_20220723_080024160_HDR.jpg": {
        latitude: 10.78519297,
        longitude: -79.19040997,
        date: "2022-07-23"
    },
    "IMG_20230407_170621344_HDR.jpg": {
        latitude: 43.28828367,
        longitude: -80.54697297,
        date: "2023-04-07"
    },
    "IMG_20231009_172434153.jpg": {
        latitude: 43.47201700,
        longitude: -80.54679600,
        date: "2023-10-09"
    },
    "IMG_20231018_152940088_HDR.jpg": {
        latitude: 43.46798297,
        longitude: -80.54213900,
        date: "2023-10-18"
    },
    "IMG_20231025_081734861_HDR.jpg": {
        latitude: 43.47719433,
        longitude: -80.53897297,
        date: "2023-10-25"
    }
}

// function getPhotoInfo() {
//     console.log(photoInfo["IMG_20200602_174653.jpg"].latitude);
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
  module.exports = { selectRandomFile, photoInfo };