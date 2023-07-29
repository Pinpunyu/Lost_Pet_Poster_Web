const movieController = require('../controllers/movieController')
const router = require('express').Router()

router.get('/', movieController.AllMovie)
router.get('/introduce/:id', movieController.IntroduceMovie)
router.get('/search', movieController.SearchMovie)
router.get('/create' , movieController.CreatePage)
router.post('/create' , movieController.CreateMovie)


module.exports = router