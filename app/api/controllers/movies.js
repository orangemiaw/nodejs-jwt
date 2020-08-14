const movieModel = require('../models/movies');

module.exports = {
    getById: function(req, res, next) {
        console.log(req.body);
        movieModel.findById(req.params.movieId, function(err, movieInfo) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "Movie found.", data: {movies: movieInfo}});
        });
    },
    getAll: function(req, res, next) {
        let moviesList = [];

        movieModel.find({}, function(err, movies) {
            if (err)
                next(err);
            else
                for (let movie of movies) {
                    moviesList.push({
                        id: movie._id,
                        name: movie.name,
                        release_on: movie.release_on
                    });
                }

                res.json({status: "success", message: "Movies list found.", data: {movies: moviesList}});
        });
    },
    updateById: function(err, res, next) {
        movieModel.findByIdAndUpdate(req.params.movieId, {name: req.body.name}, function(err, movieInfo) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "Movie updated successfully.", data: null});
        });
    },
    deleteById: function(req, res, next) {
        movieModel.findByIdAndRemove(req.params.movieId, function(err, movieInfo){
            if(err)
                next(err);
            else
                res.json({status:"success", message: "Movie deleted successfully!!!", data:null});
        });
    },
    create: function(err, res, next) {
        movieModel.create({
            name: req.body.name,
            release_on: req.body.release_on
        }, function(err, result) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "Movie added successfully.", data: null});
        });
    }
}