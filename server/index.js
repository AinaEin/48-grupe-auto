import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connection } from "./db.js";
import { apiRouter } from "./api/api.js";

const app = express();

const corsOptions = {
  credentials: true,
  origin: "http://localhost:4820",
};
const helmetOptions = {
  crossOriginResourcePolicy: false,
};

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// middleware
app.use(async (req, res, next) => {
  const { loginToken } = req.cookies;

  req.user = {
    id: -1,
    role: "public",
    isBlocked: false,
  };

  if (!loginToken) {
    return next();
  }

  try {
    const selectQuery = `SELECT * FROM login_token WHERE token = ?`;
    const dbResponse = await connection.execute(selectQuery, [loginToken]);

    if (dbResponse[0].length !== 1) {
      return next();
    }

    const tokenObj = dbResponse[0][0];
    req.user.id = tokenObj.userId;
    req.user.role = "client";
  } catch (error) {
    console.error(error);
  }

  return next();
});

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  console.log("404");
  return res.send("404 - content not found");
});

app.use((req, res, next) => {
  return res.status(404).send(
    JSON.stringify({
      type: "error",
      message: "Sorry can't find that API endpoint!",
    })
  );
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(4821, () => {
  console.log(`\nhttp://localhost:4821`);
});
