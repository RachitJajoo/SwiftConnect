
const { register, login, setavatar, getallusers ,logOut } = require('../controller/userController');

const router = require('express').Router();


router.post('/login' , login);
router.post('/register' , register);
router.post('/setavatar/:id' , setavatar);
router.get('/allusers/:id',getallusers);
router.get("/logout/:id", logOut);

module.exports = router;
