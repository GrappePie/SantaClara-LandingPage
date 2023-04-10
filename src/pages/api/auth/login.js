import { dbConnect } from "@/utils/mongoose"
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

dbConnect();

export default async function LoginHandler(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message:"Usuario y contraseña requeridos" });
  }
  const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message:"Usuario no encontrado" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message:"Contraseña incorrecta" });
    }
    const token = jwt.sign({ 
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }, process.env.JWT_SECRET);

    const serializedToken = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60,
        path: "/",
    });
    res.setHeader("Set-Cookie", serializedToken);
    res.status(200).json({ message:"Sesión iniciada" });
}