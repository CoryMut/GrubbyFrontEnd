const sharp = require("sharp");
const image = require("../../");
// const upload = require("../helpers/DigitalOcean");

const resizeImage = async (image) => {
    const threeTwenty = await sharp(image).resize(320).toBuffer();

    console.log(threeTwenty);

    // await upload(threeTwenty, "320");
};

resizeImage();

export default resizeImage;
