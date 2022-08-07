const Jimp = require('jimp');

const imageProcessing = Jimp.read('./image/defaultImg.jpg')
  .then(image => {
    image
      .resize(250, 250) 
      .quality(60) 
      .write('./image/newDefaultImg.jpg'); 
  })
.catch(err => {
    console.error(err);
  });

module.exports = imageProcessing;