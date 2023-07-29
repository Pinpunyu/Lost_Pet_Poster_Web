const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config')
const app = express()
app.use(cors(config.corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

global.users = {};
global.articles = {};



const userRouter = require('./routers/userRouter') ;
const articleRouter = require('./routers/articleRouter') ;
const movieRouter = require('./routers/movieRouter') ;

app.use('/users', userRouter)
app.use('/articles', articleRouter)
app.use('/movies', movieRouter)


app.listen(process.env.PORT || 8088, function(req , res ){
    console.log('server is running...'); 
    // console.log(process.env.PORT);
})