const movieModel = require('../Models/movieModel')

const getMovies = async(req,res) => {
    try{
        const movies = await movieModel.find().limit(200)
        const lanf = await movieModel.distinct("original_language")
        console.log('I am called')
        res.status(200).json(movies)
    }catch(error){
        console.log("Error in getting all Movies: ", error);
        return res.status(500).json(error)
    }
}


module.exports = {getMovies};