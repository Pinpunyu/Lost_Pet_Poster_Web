const jwt = require('jsonwebtoken')
const config = require('../config')

const movieList = require('../data/articles.json').results;

// Get All Movie
const AllMovie = async (req, res) => {
    res.render('index', {movies: movieList,});
}

const SearchMovie = async (req, res) => {

    const searchKeyword = req.query.keyword;
    const filterMovies = movieList.filter(movie => {
      return movie.title.toLowerCase().includes(searchKeyword.toLowerCase());
    })
    res.render('index', {
      movies: filterMovies,
      searchKeyword: searchKeyword,
    });

}

const IntroduceMovie = async (req, res) => {

    const movie_id = req.params.id;
    const movie = movieList.filter(movie => {
        return movie.id == movie_id;
    })
    
    res.render('show', {movie: movie[0],});
}

const CreatePage = async (req, res) => {
    
    res.render('new');
}

// Create Movie
const CreateMovie = async (req, res) => {

    try{
        const token = require('../data/user.json').token;
        const username = require('../data/user.json').username;
        const decoded = await jwt.verify(token, config.SECRET)
        console.log(decoded)

        if (username == decoded.username){

            const {title, image, release_date, description} = req.body;
            movieList.push({id: movieList[movieList.length-1]["id"]+1, title:title, description:description, release_date:release_date, image:image, });
            data = {"results":movieList}

            var fs = require('fs');
            fs.writeFile("./data/movies.json", JSON.stringify(data), function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }

        res.redirect('/movies');
        
    }catch(err){

        if(err.name === 'TokenExpiredError') {
            res.render('login',{message: `${username}需要重新登入`});
        }else{
            res.render('login',{message: `尚未登入`});
        }
    }

}

// Delete Movie
const DeleteMovie = async (req, res) => {

    let token;
    try {
      token = req.headers['authorization'].split(' ')[1];
    } catch (e) {
      token = '';
    }

    jwt.verify(token, config.SECRET, function (err, decoded) {
        if (err) {
            res.status(401).json({ msg: 'Unauthorized!' });
        } else {
            res.status(200).json({ msg: 'success entry room' });
            // console.log('success entry room');
        }
    });
}





module.exports = {
    AllMovie,
    IntroduceMovie,
    SearchMovie,
    CreatePage,
    CreateMovie,
}