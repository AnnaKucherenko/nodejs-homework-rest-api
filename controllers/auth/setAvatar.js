const path = require ("path");
const fs = require ("fs/promises");

// const {basedir} = global;
// console.log(basedir);

const {User} = require("../../models/user");

const avatarDir = path.join(process.cwd(), "public", "avatars");

const setAvatar = async (req,res) =>{
    try {
        const {_id} = req.user;
        const {path: tempPath, originalname} = req.file;
        const [extension] = originalname.split(".").reverse();
        const newName = `${_id}.${extension}`
        const uploadPath = path.join(avatarDir, newName);
        await fs.rename(tempPath, uploadPath);
        const avatarURL = path.join("avatars", newName);
        await User.findByIdAndUpdate(_id, {avatarURL});
        res.json({
            avatarURL,
        }) 
    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }
    
}

module.exports = setAvatar;