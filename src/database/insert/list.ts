import db from "../db";
import { list } from "../schema/schema";
function errorHandler(error: any) {
  console.error("Error: ", error);
  throw Error();
}

interface List {
  title: string;
  task: string;
}
export async function addItemInList(userid: string, item: List) {
  try {
    await db
      .insert(list)
      .values({
        userId: userid,
        title: item.title,
        task: item.task,
      })
      .catch(errorHandler);
    return true;
  } catch (e) {
    console.error(e);
    return null;
  }
}
