import express from "express";
import { connection } from "../../db.js";

const carsRouter = express.Router();

carsRouter.get("/all", (req, res) => {
  return res.send(
    JSON.stringify({
      list: cars,
    })
  );
});

carsRouter.get("/newest", (req, res) => {
  return res.send(
    JSON.stringify({
      list: cars.slice(-6).reverse(),
    })
  );
});

carsRouter.post("/create", async (req, res) => {
  const { userId, name, price } = req.body;

  if (!userId || !name || !price) {
    return res.send(
      JSON.stringify({
        type: "error",
        message: "Check values",
      })
    );
  }

    if (typeof name !== "string") {
      return res.send(
        JSON.stringify({
          type: "error",
          message: "Email has to be a string value",
        })
      );
    }

  try {
    const insertQuery = `INSERT INTO cars (userId, name, price) VALUES (?, ?, ?);`;
    const dbResponse = await connection.execute(insertQuery, [
      userId,
      name,
      price * 100,
    ]);

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
  } catch (error) {
    console.error(error);
  }

  return res.send(
    JSON.stringify({
      type: "error",
      message: 'Critical error while trying to create a "car for sale"',
    })
  );
});

carsRouter.get("/my/:userId", (req, res) => {
  return res.send(
    JSON.stringify({
      list: [],
    })
  );
});

carsRouter.get("/car/:carId", (req, res) => {
  return res.send(
    JSON.stringify({
      cars: cars.filter((car) => car.id === +req.params.carId),
    })
  );
});

carsRouter.delete("/car/:carId", (req, res) => {
  // gal galima kazkaip kitaip?
  // jog nereiketu daryti let ir butu galima pasilikti const? su splice
  cars = cars.filter((car) => car.id !== +req.params.carId);

  return res.send(
    JSON.stringify({
      type: "success",
      message: "Auto deleted",
    })
  );
});

export { carsRouter };
