import { Hono } from "hono";
import { getUserByUsername } from "../database/get/user";
import tokenGenerator from "../utility/jawGenerator";
import { passwordVerifier } from "../utility/passwordVerification";

const signin = new Hono();

signin.post("/", async (c) => {
  const body = await c.req.json();
  let errorMsg = "Server is having some issue";
  const { username, password } = body.data;
  if (!username || !password) {
      errorMsg = "provide username and password";
      return c.json({ errorMsg });
  }
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      errorMsg = "User doesnt exist";
      return c.json({ errorMsg });
    }
    const pass = passwordVerifier(password, user);
    if (!pass) {
      errorMsg = "Invalid password";
      return c.json({ errorMsg });
    }
    const token = tokenGenerator({ name: user.username, id: user.id });
    if (!token) throw Error("Error generating token");
    return c.json({
      token,
      message: "login successfully",
    });
  } catch (error) {
    console.error("error:", error);
    return c.json({ errorMsg });
  }
});

export default signin;
