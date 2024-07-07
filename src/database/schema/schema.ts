
import {
  uuid,
  text,
  serial,
  pgTable,
  timestamp,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const list = pgTable("list", {
  id: serial("id").primaryKey(),
  userId: uuid("userId")
    .references(() => user.id)
    .notNull(),
  title: text("title").notNull(),
  task: text("task").notNull(),
  addedAt: timestamp("created_At").notNull().defaultNow(),
});

export const user = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    username: text("username").notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    salt: varchar("salt", { length: 256 }).notNull(),
    refreshToken: varchar("refreshToken", { length: 256 }),
    createdAt: timestamp("created_At").notNull().defaultNow(),
  },
  (user) => ({
    usernameIndex: uniqueIndex("username_idx").on(user.username),
  })
);
