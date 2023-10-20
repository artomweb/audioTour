import path from "path";
import { readdir, rename } from "fs";
import { randomBytes } from "crypto";

const __dirname = path.resolve();

const directoryPath = path.join(__dirname, "toHash");

readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach(function (file) {
    console.log(file);
    randomBytes(48, function (err, buffer) {
      const hashName = buffer.toString("hex").slice(0, 40);

      const oldPath = join(directoryPath, file);
      const newPath = join("public", "audioFiles", hashName + ".mp3");

      rename(oldPath, newPath, function (err) {
        if (err) throw err;
        console.log("Successfully renamed - AKA moved!");
      });
    });
  });
});
