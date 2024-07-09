require("dotenv").config();
import { Hono } from "hono";
import { cors } from "hono/cors";
import signin from "./routers/signin";
import signup from "./routers/signup";
import list from "./routers/list";
const AllowedOrigins = process.env.AllowedOrigins as string;
const port = process.env.PORT;
const app = new Hono();
app.use(
  cors({
    origin: [AllowedOrigins, "http://localhost:3001"],
    allowHeaders: [
      "X-Custom-Header",
      "Upgrade-Insecure-Requests",
      "Content-Type",
      "Authorization",
    ],
    allowMethods: ["POST", "GET", "DELETE"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);
app.get("/", (c: any) => {
  return c.json("Hellow guys welcome to my blog");
});
app.route("/signin", signin);
app.route("/signup", signup);
app.route("/list", list);
 console.log(`Server is running on port ${port}`);
export default app