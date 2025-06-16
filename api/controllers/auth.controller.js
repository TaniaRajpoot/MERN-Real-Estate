import User from "../models/user.model.js";
import bycryptjs from 'bcryptjs'

export const signup = async (req,res)=>{

  const {username, email,password} = req.body;
  const hashPasswrod = bycryptjs.hashSync(password,10);
  const newUser = new User ({username, email,password:hashPasswrod});
  try {
      await newUser.save();
      res.status(201).json("user created successfully ");
  } catch (error) {
    res.status(500).json(error.message);
  }
};