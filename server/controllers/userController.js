import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", //this token will be expired after these many days
  });
};

//API to register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //user exist

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    //generating the token
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
console.log(email)
  try {
    //find user
    const user = await User.findOne({email});
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken(user._id);
        return res.json({
          success: true,
          token,
        });
      }else{
        return res.json({
          success : false,
          message : "Invalid Password"
        })
      }
    } else {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get user data
export const getUser = async (req, res) => {
  try {
    const user = req.user;
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    success: false, error.message;
  }
};
