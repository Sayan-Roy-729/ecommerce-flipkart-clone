const fs = require('fs');
const path = require('path');

const moveFileFunc = (oldFilePath, newFilePath) => {
  fs.rename(oldFilePath, newFilePath, error => {
    if (error) throw error;
  });
};

exports.moveFile = (file) => {
  if(typeof file === 'string') {
    const oldFilePath = path.join(path.dirname(__dirname), 'temp', file);
    const newFilePath = path.join(path.dirname(__dirname), 'uploads', file);
    moveFileFunc(oldFilePath, newFilePath);
  } else {
    for (everyFIle of file) {
      const oldFile = path.join(path.dirname(__dirname), 'temp', everyFIle.img);
      const newFile = path.join(path.dirname(__dirname), 'uploads', everyFIle.img);
      moveFileFunc(oldFile, newFile);
    }
  }
};
