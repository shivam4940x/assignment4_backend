import db from "../db";
import { eq } from "drizzle-orm";

function errorHandler(error: any) {
  console.error("Error: ", error);
  throw Error("Error fetching data");
}
export async function getTaskList(userid: string) {
  const list = await db.query.list
    .findMany({
      where: (list) => eq(list.userId, userid),
    })
    .catch(errorHandler);
  if (list) {
    return list;
  }
}
