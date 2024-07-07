import { Hono, Context } from "hono";
import { authMiddleware } from "../middleware/authentication";
import { addItemInList } from "../database/insert/list";
import { getTaskList } from "../database/get/taskList";
import { deleteTaskFromList } from "../database/delete/list";

const list = new Hono();
list.use(authMiddleware);
list.post("/", async (c: any) => {
  const body = await c.req.json();
  const userData = c.get("user");
  if (!body.data) return c.status(501);
  let errormsg = "Server is having some issue";
  try {
    await addItemInList(userData.id, body.data);
    return c.json("gg");
  } catch (e) {
    return c.json({ errormsg });
  }
});
list.get("/", async (c: any) => {
  const userData = c.get("user");
    let errormsg = "Server is having some issue";
  const list = await getTaskList(userData.id);
  if(!list) {
    return c.json(errormsg)
  }
  return c.json({ list, userData });
});

list.delete("/", async (c: any) => {
  const body = await c.req.json();
  if (!body.data) return c.status(501);
  const {
    data: { taskId },
  } = body;
  const userData = c.get("user");
     let errormsg = "Server is having some issue";
  const updatedList = await deleteTaskFromList(taskId, userData.id);
    if (!list) {
      return c.json(errormsg);
    }
  return c.json({ message: "User deleted successfully", updatedList });
});
export default list;
