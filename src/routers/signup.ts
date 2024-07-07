import { Hono, Context } from "hono";
import db from "../database/db";
import { user } from "../database/schema/schema";
import { hashing, salting } from "../utility/crypto";
import tokenGenerator from "../utility/jawGenerator";
import { getUserByUsername } from "../database/get/user";
import { stringChecker } from "../utility/stringChecker";

const signup = new Hono();

signup.post("/", async (c: Context) => {
  let errorMsg = "Server is having some issue";
  const body = await c.req.json();
  const { username, password } = body.data;
  if (!username || !password) {
    errorMsg = "provide username and password";
    return c.json({errorMsg});
  }
  const InValidationCheck_user = stringChecker(username);
  if (InValidationCheck_user) {
    errorMsg = "Provide another username";
    return c.json({errorMsg});
  }
  const InValidationCheck_pass = stringChecker(password);
  if (InValidationCheck_pass) {
    errorMsg = "Provide another password";
    return c.json({errorMsg});
  }
  const salt = salting();
  const hashedPass = hashing(password, salt);
  try {
    await db
      .insert(user)
      .values({
        username,
        password: hashedPass,
        salt,
      })
      .catch((e) => {
        errorMsg = "user already exist";
        throw Error("Error creating user");
      });
    const newUser = await getUserByUsername(username);
    if (!newUser) throw Error("Error getting user");
    const token = tokenGenerator({ name: newUser.username, id: newUser.id });
    if (!token) throw Error("Error generating token");
    return c.json({
      token,
      message: "User created successfully",
    });
  } catch (err: any) {
    return c.json({ errorMsg });
  }
});

export default signup;
