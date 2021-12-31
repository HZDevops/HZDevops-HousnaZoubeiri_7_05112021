const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/createpost', auth, multer, postCtrl.createUserPost);
router.get('/', auth, postCtrl.displayPosts);
router.get('/:postid', auth, postCtrl.displayPost);
router.put('/:postid', auth, multer, postCtrl.updateUserPost);
router.delete('/:postid', auth, postCtrl.deletePost);

module.exports = router; 