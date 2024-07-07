import db from "../db";
import { eq, and } from "drizzle-orm";
import { list } from "../schema/schema";
function errorHandler(error: any) {
  console.error("Error: ", error);
  throw Error();
}

export async function deleteTaskFromList(taskid: number, userid: string) {
  const res = await db
    .delete(list)
    .where(and(eq(list.id, taskid), eq(list.userId, userid)))
    .returning()
    .catch(errorHandler);
  if (res && res.length > 0) {
    const updatedList = await db
      .select()
      .from(list)
      .where(eq(list.userId, userid))
      .catch(errorHandler);
    return updatedList;
  }
}
