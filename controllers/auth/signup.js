const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const uuid = require("uuid");
const {User, schemas} = require("../../models/user");

const {createError, transporter} = require("../../helpers/sendEmail");

const signup = async(req, res) =>{
    const {error} = schemas.signup.validate(req.body);
    if(error){
        throw createError(400, error.message);
    }
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw createError(409, "Email in use");
    }
    const hashPassword =  await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);  
    const verificationToken = uuid();        
    const result = await User.create({...req.body, password:hashPassword, avatarURL, verificationToken});
    const mail = {
        to: "annakucherenko31@gmail.com",
        subject: "Подтверждение регистрации на сайте",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Нажмите для подтверждения регистрации</a>`
    
    }
    await transporter.sendMail(mail);
    res.status(201).json({
        email: result.email,
        subscription: "starter",
    })
}

module.exports = signup;