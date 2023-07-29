// jwt
const jwt = require('jsonwebtoken')
const config = require('../config')
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

const alluser = async (req, res) => {

    try{
        res.status(200).json(global.users);
    }catch{
        res.status(401).json({ msg: "err" });
    }

}

const register_page = async (req, res) => {

    res.render('register');
}

const EXPIRES_IN = 60 * 1000; // 1 minute
const register = async (req, res) => {

    try {
        // 確認帳號是否已經申請過
        const { username } = req.body;
        if(global.users.hasOwnProperty(username)){
            res.render('register',{message: `${username}已經被註冊了`});
        }else{
            const user_token = await jwt.sign({ username }, config.SECRET, { expiresIn: EXPIRES_IN });
            global.users[username] = {"user_token" : user_token,}
            res.redirect('/users/login');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "err" });
    }
};

const login_page = async (req, res) => {
    
    res.render('login');
}

const login = async (req, res) => {
    
    try {
        const username = req.body.username;
        
        // 確認有沒有這個帳號
        if(global.users.hasOwnProperty(username)){
            const user_token = global.users[username].user_token;
            data = {"username": username, "token": user_token}
            var fs = require('fs');
            fs.writeFile("./data/user.json", JSON.stringify(data), function(err) {
                if (err) {
                    console.log(err);
                }
            });

            res.redirect('/articles');    
        }else{
            res.render('register',{message: `${username}還未註冊`});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "err" });
    }
};

module.exports = {
    alluser,
    register_page,
    register,
    login_page,
    login,
}