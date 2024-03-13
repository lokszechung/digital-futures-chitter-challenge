import express from "express";
import { config } from "dotenv";
import { connectToDb } from "./db/connection.js";

import { router as peepsRouter } from "./routes/peeps.routes.js";
import { router as usersRouter } from "./routes/users.route.js";

config({path: `.env.${process.env.NODE_ENV}`})

const app = express();

app.use("/peeps", peepsRouter);
app.use("/users", usersRouter);

try {
  console.log(`⏳Connecting to database @ ${process.env.DB_URI}`);
  await connectToDb(process.env.DB_URI);
  console.log(`🔗Connected to database @ ${process.env.DB_URI}`);
}
catch (e) {
  console.error(e);
}

app.listen(process.env.PORT, console.log(`🚀Server running on port ${process.env.PORT}`))

