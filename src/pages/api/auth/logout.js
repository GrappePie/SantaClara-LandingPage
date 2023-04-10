import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default function LogoutHandler(req, res) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  try {
    verify(token, process.env.JWT_SECRET)
    const serializedToken = serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      });
      res.setHeader("Set-Cookie", serializedToken);
      res.status(200).json({ message: "Sesión cerrada" });
  } catch (error) {
    res.status(500).json({ message: "Error al cerrar sesión" });
  }
}
