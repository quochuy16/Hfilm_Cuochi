const jwt = require("jsonwebtoken");
// const { v4: uuidv4 } = require('uuid');
const Film = require("../models/FilmModel");
const path = require('path')

exports.add = async (req,res,next) => {
    const film = await Film.create(req.body);
    return res.status(201).json({
        status:"success",
        film
    })
}

exports.update = async(req,res,next) => {
    const film = await Film.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
      });
    if(!film) {
        console.log("no Film");
        return;
    }
    console.log(film);
    return res.status(200).json({
        status:"success",
        film,
    });
}

exports.delete = async(req,res,next) => {
    const id = req.params.id;
    const film = await Film.findByIdAndDelete(id);
    if(!film) {
        return res.status(204).json({
            status:"This movie does not exist",
        })
    }

    return res.status(200).json({
        status:"Deleted successfully !"
    })
}

exports.getById = async(req,res,next) => {
    const id = req.params.id;
    const film = await Film.findById(id);
    if(!film) {
        return res.status(204).json({
            status:"No content",
        })
    }else{
        return res.status(200).json({
            status:"success",
            film
        })
    }

    
}


exports.getAll = async (req,res,next) => {
    const films = await Film.find({});
    return res.status(200).json({
        status:"success",
        films
    })
}