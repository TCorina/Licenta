const mongoose = require("mongoose");

// Conectare la baza de date
mongoose.connect("mongodb://localhost:27017/autoDB", { useNewUrlParser: true, useUnifiedTopology: true });

const CarSchema = new mongoose.Schema({
    vin: String,
    model: String,
    itp: Date,
    asigurare: Date
});

const Car = mongoose.model("Car", CarSchema);

const getCars = async () => await Car.find();
const addCar = async (vin, model, itp, asigurare) => {
    const newCar = new Car({ vin, model, itp, asigurare });
    return await newCar.save();
};

module.exports = { getCars, addCar };
