const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    breedname: {
        type: String,
    },
    age: {
        type: Number,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
    },
   
 }, {
        timestamps: true
 });

module.exports = mongoose.model("Pet", PetSchema);