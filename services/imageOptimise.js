const sharp = require('sharp');

module.exports = function imageOptim(image) {
    return sharp(image)
        .jpeg({ quality: 75 })
        .resize({ width: 1000 })
        .toBuffer();
}