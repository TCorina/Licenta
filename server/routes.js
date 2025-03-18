const express = require("express");
const router = express.Router();
const { getCars, addCar } = require("./models");

// Ruta pentru a obține toate mașinile
router.get("/cars", async (req, res) => {
    const cars = await getCars();
    res.json(cars);
});

// Ruta pentru a adăuga o mașină
router.post("/cars", async (req, res) => {
    const { vin, model, itp, asigurare } = req.body;
    const newCar = await addCar(vin, model, itp, asigurare);
    res.json(newCar);
});

module.exports = router;
