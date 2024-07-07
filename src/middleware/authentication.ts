import { MiddlewareHandler } from "hono";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.json({ errorMsg: "Authorization header is missing" }, 401);
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return c.json({ errorMsg: "Token is missing" }, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as JwtPayload;
    c.set("user", decoded);
    await next();
  } catch (err) {
    return c.json({ errorMsg: "Invalid or expired token" }, 401);
  }
};