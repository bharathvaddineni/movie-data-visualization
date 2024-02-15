const express = require('express')
const {getMovies} = require('../Controllers/movieController')
const router = express.Router()

router.get('/',getMovies)
router.get('/year',getMovies)

module.exports = router