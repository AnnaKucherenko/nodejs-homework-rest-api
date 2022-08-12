const multer = require("multer");
const path = require("path");
const imageProcessing = require("../helpers/imageProcessing");

const tempDir = path.join(process.cwd(), "temp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb)=>{
        const fileName = file.originalname;
        // console.log(tempDir)
        // imageProcessing(tempDir)
        console.log(fileName)
        cb(null, fileName);
    }
});

const upload = multer({
    storage:multerConfig
});

module.exports = upload;