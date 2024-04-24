import express from "express";

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

carsRouter.post("/create", (req, res) => {
  const { userId, name, price } = req.body;

  cars.push({
    id: ++lastCarId,
    userId,
    name,
    price,
    img: "http://localhost:4821/img/cars/1.jpg",
  });

  for (const user of users) {
    if (user.id === userId) {
      user.cars.push(lastCarId);
      break;
    }
  }

  return res.send(
    JSON.stringify({
      type: "success",
      message: "Car created",
      car: cars.at(-1),
    })
  );
});

carsRouter.get("/my/:userId", (req, res) => {
  return res.send(
    JSON.stringify({
      list: cars.filter((car) => car.userId === +req.params.userId),
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
