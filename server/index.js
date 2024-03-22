import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
import { connectToDb } from "./db/connection.js";

import { router as peepsRouter } from "./routes/peeps.routes.js";
import { router as usersRouter } from "./routes/users.route.js";

config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));

app.use(cookieParser());

// app.use((req, res, next) => {
// 	console.log(`Request recieved: ${req.method} - ${req.url}`);
// 	next();
// });
app.use("/api/peep", peepsRouter);
app.use("/api/user", usersRouter);

try {
	console.log(`⏳Connecting to database @ ${process.env.DB_URI}`);
	await connectToDb(process.env.DB_URI);
	console.log(`🔗Connected to database @ ${process.env.DB_URI}`);
} catch (e) {
	console.error(e);
}

const server = app.listen(
	process.env.PORT,
	console.log(`🚀Server running on port ${process.env.PORT}`)
);

export default server;
