const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signUp);
router.post('/signin', userCtrl.signIn);
router.get('/profil', auth, userCtrl.getUserProfil);
router.get( '/allmembers', auth, userCtrl.getMembers);
router.put('/profil', auth, multer, userCtrl.updateUserProfil);
router.delete('/profil', auth, userCtrl.deleteUserProfil);

module.exports = router;