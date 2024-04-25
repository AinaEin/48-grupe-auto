import { connection } from "../../db.js";

export async function apiLoginPost(req, res) {
  const minEmailLength = 6;
  const maxEmailLength = 50;
  const minPasswordLength = 12;
  const maxPasswordLength = 100;
  const { email, password } = req.body;

  if (typeof email !== "string") {
    return res.send(
      JSON.stringify({
        type: "error",
        message: "Email has to be a string value",
      })
    );
  }

  if (email.length < minEmailLength) {
    return res.send(
      JSON.stringify({
        type: "error",
        message: `Email is too short, has to be at least ${minEmailLength} symbols`,
      })
    );
  }

  if (email.length > maxEmailLength) {
    return res.send(
      JSON.stringify({
        type: "error",
        message: `Email is too long, has to be no more than ${maxEmailLength} symbols`,
      })
    );
  }

  if (typeof password !== "string") {
    return res.send(
      JSON.stringify({
        type: "error",
        message: "Password has to be a string value",
      })
    );
  }

  if (password.length < minPasswordLength) {
    return res.send(
      JSON.stringify({
        type: "error",
        message: `Password is too short, has to be at least ${minPasswordLength} symbols`,
      })
    );
  }

  if (password.length > maxPasswordLength) {
    return res.send(
      JSON.stringify({
        type: "error",
        message: `Password is too long, has to be no more than ${maxPasswordLength} symbols`,
      })
    );
  }

  try {
    const selectQuery = `SELECT * FROM users WHERE email = ? AND password = ?;`;
    const dbResponse = await connection.execute(selectQuery, [email, password]);

    if (dbResponse[0].length === 1) {
      return res.send(
        JSON.stringify({
          message: "Welcome",
          loggedIn: true,
          userId: dbResponse[0][0].id,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }

  return res.send(
    JSON.stringify({
      message: "Such user does not exist",
      loggedIn: false,
    })
  );
}
