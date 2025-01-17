const {User, schemas} = require("../../models/user");

const {createError, transporter} = require("../../helpers");


const resendVerifyEmail = async(req,res)=>{
    const {email} = req.body;
    const {error} = schemas.signup.validate(email);
    if(error){
        throw createError(400, "missing required field email");
    }
    const user = await User.findOne({email});
    if(!user){
        throw createError(404);
    }
    if(user.verify){
        throw createError(400, "Verification has already been passed");
    }
    const mail = {
        to: email,
        from: "annakucherenko31@meta.ua",
        subject: "Подтверждение регистрации на сайте",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Нажмите для подтверждения регистрации</a>`
    
    }
    transporter.sendMail(mail);
    res.json({
        message: "Verification email sent"
    }) 
}

module.exports = resendVerifyEmail;