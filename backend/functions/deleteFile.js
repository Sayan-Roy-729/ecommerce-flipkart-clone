const fs = require('fs');
const path = require('path');

const deleteFunc = (filePath) => {
  fs.unlink(filePath, (error) => {
    if (error) throw error;
  });
};

exports.deleteFile = (file) => {
  // Check the file is array of files or not
  if (typeof file !== 'string') {
    for (file of files) {
      const filePath = path.join(path.dirname(__dirname), 'temp', file.img);
      deleteFunc(filePath);
    }
  } else {
    const filePath = path.join(path.dirname(__dirname), 'temp', fileName);
    deleteFunc(filePath);
  }
};
