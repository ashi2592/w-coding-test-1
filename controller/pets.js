const Pets = require('../models/pets');

const createPet = async (req, res, next) => {
    try {
        const pet = new Pets(req.body);
        await pet.save();
        res.status(201).json(pet);
    } catch (e) {
        next(e);
    }
}

const getPets = async (req, res, next) => {
    try {
        const pets = await Pets.find({})
        res.status(200).json(pets);
    } catch (e) {
        next(e);
    }
}


const getPetDetails = async (req, res, next) => {
    try {
        const name = req.params ? req.params.name : null;
        const pets = await Pets.findOne({name})
        res.status(200).json(pets);
    } catch (e) {
        next(e);
    }
}

const deletePet = async (req, res, next) => {
    try {
        const name = req.params ? req.params.name : null;
        await Pets.deleteOne({name}).catch((err)=>{
            next(err);
        })
        res.status(200).json({message: "successfully deleted"});
    } catch (e) {
        next(e);
    }
}

module.exports = {
    createPet,
    getPets,
    getPetDetails,
    deletePet
}