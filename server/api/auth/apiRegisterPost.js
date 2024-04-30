import { connection } from "../../db.js";

export async function apiRegisterPost(req, res) {
  const minEmailLength = 6;
  const maxEmailLength = 50;
  const minPasswordLength = 12;
  const maxPasswordLength = 100;
  const { email, password } = req.body;
  const parts = email.split("@");

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

  if (!email.includes("@")) {
    return res.send(
      JSON.stringify({
        type: "error",
        message: "The email must contain an @ symbol.",
      })
    );
  }

  if (parts.length > 2) {
    return res.send(
      JSON.stringify({
        type: "error",
        message: "The email must contain only one @ symbol.",
      })
    );
  }

  if (!parts[1].includes(".")) {
    return res.send(
      JSON.stringify({
        type: "error",
        message: "The domain part of the email must contain at least one dot.",
      })
    );
  }

  if (email.includes(" ")) {
    return res.send(
      JSON.stringify({
        type: "error",
        message: "The email must not contain spaces.",
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
        message: `Password is too short, has to be at least ${minPasswordLength} symbols.`,
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

  if (password.search(/[a-z]/) == -1) {
    return res.send(
      JSON.stringify({
        type: "error",
        message: "Your password needs at least one lower case letter.",
      })
    );
  }

  if (password.search(/[A-Z]/) == -1) {
    return res.send(
      JSON.stringify({
        type: "error",
        message: "Your password needs at least one upper case letter.",
      })
    );
  }

  if (password.search(/[0-9]/) == -1) {
    return res.send(
      JSON.stringify({
        type: "error",
        message: "Your password needs a number.",
      })
    );
  }

  try {
    const selectQuery = `SELECT * FROM users WHERE email = ?;`;
    const dbResponse = await connection.execute(selectQuery, [email]);

    if (dbResponse[0].length > 0) {
      return res.send(
        JSON.stringify({
          type: "error",
          message: "User already exists",
        })
      );
    }
  } catch (error) {
    console.error(error);

    return res.send(
      JSON.stringify({
        type: "error",
        message: "Problems while trying to register a user",
      })
    );
  }

  try {
    const insertQuery = `INSERT INTO users (email, password) VALUES (?, ?);`;
    const dbResponse = await connection.execute(insertQuery, [email, password]);

    if (dbResponse[0].affectedRows !== 1) {
      return res.send(
        JSON.stringify({
          type: "error",
          message: "User could not be created, for some weird reason",
        })
      );
    }

    return res.send(
      JSON.stringify({
        type: "success",
        message: "User successfully registered",
      })
    );
  } catch (error) {
    console.error(error);

    return res.send(
      JSON.stringify({
        type: "error",
        message: "Problems while trying to register a user",
      })
    );
  }
}
