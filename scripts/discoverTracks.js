const fs = require('fs');
const path = require('path');
const tracksPath = './public/assets/sounds/musicalCube/tracks';
const outputPath = path.resolve("./src/pages/realms/musicalCubes/tracks.ts")
const r2BaseUrl = 'https://pub-7236cb2f994c4bdeba84ae4920d69b30.r2.dev/sounds';

//https://gist.github.com/kethinov/6658166
const getFilePaths = (folderPath) => {
  const entryPaths = fs.readdirSync(folderPath).filter(file => file != '.DS_Store').map(entry => path.join(folderPath, entry));
  const filePaths = entryPaths.filter(entryPath => fs.statSync(entryPath).isFile());
  const dirPaths = entryPaths.filter(entryPath => !filePaths.includes(entryPath));
  const dirFiles = dirPaths.reduce((prev, curr) => prev.concat(getFilePaths(curr)), []);

  return [...filePaths, ...dirFiles];
};

const getSoundsForTrack = (trackName, trackFolderPath) => {
  const fileList = getFilePaths(trackFolderPath);
  const formatFileList = (fileList) => `
      { 
        name : "${trackName}",
        sounds : [${fileList.map(filepath => `"${r2BaseUrl}${filepath.replace('public/assets/sounds/musicalCube', '')}"`)}]
      }`;

  return formatFileList(fileList);
}

const tracks = fs.readdirSync(tracksPath)
  .filter(file => file != '.DS_Store')
  .map(trackName => getSoundsForTrack(trackName, path.join(tracksPath, trackName)));

const formatTracks = trackArray => `
export interface Track { 
  name : string; 
  sounds : string[];
}

const tracks : Track[] = [${trackArray.join(',')} ];

export default tracks;`;

const finalFileContent = formatTracks(tracks);

fs.writeFile(outputPath, finalFileContent, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Discovered sounds : ${outputPath}`);
  }
});
