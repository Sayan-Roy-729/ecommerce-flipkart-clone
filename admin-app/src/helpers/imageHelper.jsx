import React, { useState } from 'react';

const App = (props) => {
  const [selectedImages, setSelectedImages] = useState('');

  const imageHandler = (event) => {
    // event.target.files;
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      console.log(fileArray);
      setSelectedImages(prevImages => prevImages.concat(fileArray));
      Array.from(event.target.files.map(file => URL.revokeObjectURL(file)));
    }
  };
  const renderPhotos = (source) => {
    return source.map(photo => {
      return <img src = {photo} key = {photo} alt = {photo}/>
    });
  };
  return (
    <div>
      <form action="">
      <label htmlFor="">Select FIles</label>
      <input
        type="file"
        multiple
        accept="image/"
        onChange={imageHandler}
      />
    </form>
    <div>
      {renderPhotos(selectedImages)}
    </div>
    </div>
  );
};

export default App;
