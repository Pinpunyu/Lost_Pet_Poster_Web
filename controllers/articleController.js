const jwt = require('jsonwebtoken')
const config = require('../config')

const articleList = require('../data/articles.json').results;

// Get All Article
const AllArticle = async (req, res) => {
    res.render('index', {articles: articleList,});
}

const SearchArticle = async (req, res) => {

    const searchKeyword = req.query.keyword;
    const filterArticles = articleList.filter(article => {
      return article.title.toLowerCase().includes(searchKeyword.toLowerCase());
    })
    res.render('index', {
        articles: filterArticles,
        searchKeyword: searchKeyword,
    });

}

const IntroduceArticle = async (req, res) => {

    const article_id = req.params.id;
    const article = articleList.filter(article => {
        return article.id == article_id;
    })
    
    res.render('show', {article: article[0],});
}

const CreatePage = async (req, res) => {
    
    res.render('new');
}

// Create Article
const CreateArticle = async (req, res) => {

    try{
        const token = require('../data/user.json').token;
        const username = require('../data/user.json').username;
        const decoded = await jwt.verify(token, config.SECRET)
        // console.log(decoded)

        if (username == decoded.username){

            const {title, image, release_date, description} = req.body;
            articleList.push({id: articleList[articleList.length-1]["id"]+1, title:title, description:description, release_date:release_date, image:image, });
            data = {"results":articleList}

            var fs = require('fs');
            fs.writeFile("./data/articles.json", JSON.stringify(data), function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }

        res.redirect('/articles');
        
    }catch(err){

        if(err.name === 'TokenExpiredError') {
            res.render('login',{message: `${username}需要重新登入`});
        }else{
            res.render('login',{message: `尚未登入`});
        }
    }

}

// Delete Article
const DeleteArticle = async (req, res) => {

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
    AllArticle,
    IntroduceArticle,
    SearchArticle,
    CreatePage,
    CreateArticle,
}