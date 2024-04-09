import express from "express";

const app = express();

app.post("/api/register", (req, res) => {
  return res.send(
    JSON.stringify({
      message: "Register API",
    })
  );
});

app.post("/api/login", (req, res) => {
  return res.send(
    JSON.stringify({
      message: "Login API",
    })
  );
});

app.get("*", (req, res) => {
  return res.send("404 - content not found");
});

app.listen(4821, () => {
  console.log(`\nhttp://localhost:4821`);
});
