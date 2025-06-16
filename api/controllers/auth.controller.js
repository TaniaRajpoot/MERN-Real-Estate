import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utilis/error.js";
import jwt from 'jsonwebtoken';

// SIGN UP Controller
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(errorHandler(409, 'User already exists'));

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ success: true, message: "User created successfully" });

  } catch (error) {
    next(error);
  }
};

// SIGN IN Controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(401, 'Invalid email or password'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, 'Invalid email or password'));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .status(200)
      .json({ success: true, ...rest });

  } catch (error) {
    next(error);
  }
};
