import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";

const app = express();

const corsOptions = {
  origin: "http://localhost:4820",
};
const helmetOptions = {
  crossOriginResourcePolicy: false,
};

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = [];

const cars = [
  {
    id: 1,
    name: "Auto pavadinimas",
    img: "http://localhost:4821/img/cars/1.jpg",
    price: 0,
  },
];

app.post("/api/register", (req, res) => {
  let isUniqueUserEmail = true;

  for (const user of users) {
    if (user.email === req.body.email) {
      isUniqueUserEmail = false;
      break;
    }
  }

  if (isUniqueUserEmail) {
    users.push(req.body);
    console.log(users);

    return res.send(
      JSON.stringify({
        type: "success",
        message: "User successfully registered",
      })
    );
  }

  return res.send(
    JSON.stringify({
      type: "error",
      message: "User already exists",
    })
  );
});

app.post("/api/login", (req, res) => {
  let userExists = false;

  for (const user of users) {
    if (user.email === req.body.email && user.password === req.body.password) {
      userExists = true;
      break;
    }
  }

  if (userExists) {
    return res.send(
      JSON.stringify({
        message: "User successfully logged in",
        loggedIn: true,
      })
    );
  }

  return res.send(
    JSON.stringify({
      message: "Such user does not exist",
      loggedIn: false,
    })
  );
});

app.get("/api/cart-details", (req, res) => {
  return res.send(
    JSON.stringify({
      data: [
        {
          name: "Pomidoras",
          price: 2,
          amount: 0,
        },
        {
          name: "Agurkas",
          price: 1.5,
          amount: 0,
        },
        {
          name: "Svogūnas",
          price: 5,
          amount: 0,
        },
      ],
    })
  );
});

app.get("*", (req, res) => {
  console.log("404");
  return res.send("404 - content not found");
});

app.use((req, res, next) => {
  return res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(4821, () => {
  console.log(`\nhttp://localhost:4821`);
});
