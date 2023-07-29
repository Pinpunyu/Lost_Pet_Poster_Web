const userController = require('../controllers/userController')
const router = require('express').Router()

router.get('/alluser', userController.alluser)
router.get('/register', userController.register_page)
router.get('/login', userController.login_page)
router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router