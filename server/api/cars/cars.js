import express from "express";
import { connection } from "../../db.js";

const carsRouter = express.Router();

carsRouter.get("/all", async (req, res) => {
  try {
    const selectQuery = `SELECT * FROM cars;`;
    const dbResponse = await connection.execute(selectQuery);

    return res.send(
      JSON.stringify({
        type: "success",
        list: dbResponse[0],
      })
    );
  } catch (error) {
    console.error(error);

    return res.send(
      JSON.stringify({
        type: "error",
        message: "Critical error while trying to get all cars for sale",
      })
    );
  }
});

carsRouter.get("/newest", async (req, res) => {
  const maxCount = 6;

  try {
    const selectQuery = `SELECT * FROM cars ORDER BY created_on DESC LIMIT ?;`;
    const dbResponse = await connection.execute(selectQuery, [maxCount]);

    return res.send(
      JSON.stringify({
        type: "success",
        list: dbResponse[0],
      })
    );
  } catch (error) {
    console.error(error);

    return res.send(
      JSON.stringify({
        type: "error",
        message: "Critical error while trying to get all cars for sale",
      })
    );
  }
});

carsRouter.post("/create", async (req, res) => {
  const { userId, name, price } = req.body;
  const img = "http://localhost:4821/img/cars/7.jpg";

  try {
    const insertQuery = `INSERT INTO cars (userId, name, img, price) VALUES (?, ?, ?, ?);`;
    const dbResponse = await connection.execute(insertQuery, [
      userId,
      name,
      img,
      price * 100,
    ]);

    if (dbResponse[0].affectedRows === 0) {
      return res.send(
        JSON.stringify({
          type: "error",
          message: "Car could not be created, oops (dublicate found)",
        })
      );
    }

    if (dbResponse[0].affectedRows === 1) {
      return res.send(
        JSON.stringify({
          type: "success",
          message: "Car created",
          car: {
            id: dbResponse[0].insertId,
            name,
            price,
            img: "",
          },
        })
      );
    }

    return res.send(
      JSON.stringify({
        type: "error",
        message: "Critical error while creating car",
      })
    );
  } catch (error) {
    console.error(error);

    return res.send(
      JSON.stringify({
        type: "error",
        message: 'Critical error while trying to create a "car for sale"',
      })
    );
  }
});

carsRouter.get("/my/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const selectQuery = `SELECT * FROM cars WHERE userId = ?;`;
    const dbResponse = await connection.execute(selectQuery, [userId]);

    return res.send(
      JSON.stringify({
        type: "success",
        list: dbResponse[0],
      })
    );
  } catch (error) {
    console.error(error);

    return res.send(
      JSON.stringify({
        type: "error",
        message: "Critical error while trying to get all my cars",
      })
    );
  }
});

carsRouter.get("/:carId", async (req, res) => {
  const { carId } = req.params;

  try {
    const selectQuery = `SELECT * FROM cars WHERE id = ?;`;
    const dbResponse = await connection.execute(selectQuery, [carId]);

    if (dbResponse[0].length === 0) {
      return res.send(
        JSON.stringify({
          type: "error",
          message: "Such car does not exist",
        })
      );
    }

    return res.send(
      JSON.stringify({
        type: "success",
        car: dbResponse[0][0],
      })
    );
  } catch (error) {
    console.error(error);

    return res.send(
      JSON.stringify({
        type: "error",
        message: "Critical error while trying to get car details",
      })
    );
  }
});

carsRouter.delete("/:carId", async (req, res) => {
  const { carId } = req.params;

  try {
    const deleteQuery = `DELETE FROM cars WHERE id = ?;`;
    const dbResponse = await connection.execute(deleteQuery, [carId]);

    console.log(dbResponse);

    if (dbResponse[0].affectedRows === 0) {
      return res.send(
        JSON.stringify({
          type: "success",
          message: "Could not delete car, because it does not exist",
        })
      );
    }

    return res.send(
      JSON.stringify({
        type: "success",
        message: "Auto deleted",
      })
    );
  } catch (error) {
    console.error(error);

    return res.send(
      JSON.stringify({
        type: "error",
        message: "Critical error while trying to delete car",
      })
    );
  }
});

export { carsRouter };
