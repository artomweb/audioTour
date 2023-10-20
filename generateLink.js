import path from "path";
import fs from "fs";

import mutag from "mutag";

const __dirname = path.resolve();

const directoryPath = path.join(__dirname, "public", "audioFiles");

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach(function (file) {
    const filePath = path.join(directoryPath, file);

    fs.readFile(filePath, (err, data) => {
      mutag.fetch(data).then((tags) => {
        const originUrl = "https://audio.artomweb.com/?track=";
        const hash = file.replace(".mp3", "");
        console.log(originUrl + hash, tags.TIT2);
      });
    });
  });
});
