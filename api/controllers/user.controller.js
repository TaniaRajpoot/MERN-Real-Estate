import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

import bycryptjs from "bcryptjs"
export const test = (req, res) => {
    res.json({
        message: 'APi route is working ',
    });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(430, 'You can only update your own account'));
  }

  try {
    if (req.body.password) {
      const salt = bycryptjs.genSaltSync(10);
      req.body.password = bycryptjs.hashSync(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};