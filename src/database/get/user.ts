import db from "../db";
import { eq } from "drizzle-orm";

function errorHandler(error: any) {
  console.error("Error: ", error);
  throw Error();
}

export async function getUserByUsername(username: string) {
  try {
    const user = await db.query.user.findFirst({
      where: (user) => eq(user.username, username),
    });
    return user;
  } catch (error) {
    errorHandler(error);
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.query.user.findFirst({
      where: (user) => eq(user.id, id),
    });
    return user;
  } catch (error) {
    errorHandler(error);
    return null;
  }
}
