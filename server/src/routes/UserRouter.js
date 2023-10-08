const express = require("express")
const router = express.Router()
const userController = require('../controllers/UserController')

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.login)
router.put('/:id',userController.updateUser);
router.get('/:id',userController.getById);
router.use(userController.protect);



module.exports = router