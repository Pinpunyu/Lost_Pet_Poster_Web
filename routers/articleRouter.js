const articleController = require('../controllers/articleController')
const router = require('express').Router()

router.get('/', articleController.AllArticle)
router.get('/introduce/:id', articleController.IntroduceArticle)
router.get('/search', articleController.SearchArticle)
router.get('/create' , articleController.CreatePage)
router.post('/create' , articleController.CreateArticle)


module.exports = router