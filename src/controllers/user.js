import UserModel from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const SIGN_UP = async (req, res) => {
  const data = req.body;

  const salt = bcryptjs.genSaltSync(10);
  const passwordHash = bcryptjs.hashSync(data.password, salt);

  const user = {
    id: uuidv4(),
    email: data.email,
    name: data.name,
    password: passwordHash,
  };

  const respose = await new UserModel(user);
  respose.save();

  res.status(200).json({
    message: "Sign in successfully",
  });
};

const LOGIN = async (req, res) => {
  const data = req.body;

  const user = await UserModel.findOne({ email: data.email });

  if (!user) {
    return res.status(401).json({ message: "Bad email or password" });
  }

  const isPasswordMatch = bcryptjs.compareSync(data.password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Bad email or password" });
  }

  const token = jwt.sign(
    { email: user.email, userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  res.status(200).json({
    message: "Logged in successfully",
    jwt: token,
  });
};

export { SIGN_UP, LOGIN };
