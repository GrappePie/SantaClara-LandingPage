import jwt from "jsonwebtoken";

export default async function ProfileHandler(req, res) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  const { _id, username, email, role } = jwt.verify(token, process.env.JWT_SECRET);
  res.status(200).json({ _id, username, email, role });
}