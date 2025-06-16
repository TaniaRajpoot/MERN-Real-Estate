import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'; // also fix spelling if needed
import { errorHandler } from "../utilis/error.js";
import jwt from 'jsonwebtoken'
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
   next(error);
}
};

export const signin = async (req,res,next)=>{
  const {email,password} = req.body;
  try {
    const validUser = await User.findOne({email});
    if(!validUser) return next(errorHandler(404,'user not found'));
    const validPassword = bcryptjs.compareSync(password,validUser.password);
    if(!validPassword) return next(errorHandler(402,'Wrong Credentials'));
    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
    const {password:pass , ...rest} = validUser._doc;
    res
    .cookie('access_token',token , {httpOnly:true})
    .status(200)
    .json(rest);




    
  } catch (error) {
    next(error);
  }

}
