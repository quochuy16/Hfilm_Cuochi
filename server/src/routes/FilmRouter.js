const { Router } = require('express');
const express = require('express');
const filmController = require('../controllers/FilmController');
const userController = require('../controllers/UserController')

const router = express.Router();
// router.use(userController.protect);
router.post('/',filmController.add);
router.put('/:id',filmController.update);
router.delete('/:id',filmController.delete);
router.get('/',filmController.getAll);
router.get('/:id',filmController.getById);


module.exports = router;