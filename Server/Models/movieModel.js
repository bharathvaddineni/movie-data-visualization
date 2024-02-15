const express = require('express')
const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    id: Number,
    title:String,
    vote_average:Number,
    vote_count:Number,
    Status: String, // "Rumored", "In Production"
    release_Date: Date,
    revenue:Number,
    runtime:Number,  // in minutes
    adult: Boolean,   // true if the film is intended for an adult audience only
    budget: Number,   // in $10 million USD
    homepage: String,
    original_language:String,
    original_title: String,
    overview: String,
    popularity: Number,
    tagline: String,
    geners: String,
    producation_companies: String,
    production_countries:String,
    spoken_languages:String
})

const movieModel = mongoose.model("anime",movieSchema)
module.exports= movieModel