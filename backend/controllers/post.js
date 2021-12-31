const models = require('../models');
const token = require('../utils/token');
const fs = require('fs');
const console = require('console');


function createUserPost(req, res) {
    let id = token.getUserId(req)
    models.User.findOne({
        attributes: ['id', 'email', 'username'],
        where: { id }
    })
        .then(user => {
            if (!req.file) {
                return models.Post.create({
                  UserId: user.id,
                  title: req.body.title,
                  content: req.body.content,
                  attachment: ''
                 
                })
                  .then((post) => res.status(201).json(post))
                  .catch((error) => res.status(500).json(error));
            } else {
                    models.Post.create({
                      UserId: user.id,
                      title: req.body.title,
                      content: req.body.content,
                      attachment: `${req.protocol}://${req.get(
                        'host'
                      )}/images/${req.file.filename}`,
                    
                    })
                      .then((post) => res.status(201).json({ post }))
                      .catch((error) => res.status(500).json(error));
                }
        })
}

function displayPosts (req, res) {
    models.Post.findAll({

      order: [['createdAt', 'DESC']],
      include: {
        model: models.User,
      },
    })
      .then((posts) => res.status(200).json({ posts }))
      .catch((error) => res.status(500).json(error));
};

function displayPost(req, res){
    let postId = req.params.postid;
    models.Post.findOne({
        where: { id:postId },
        include: [{
            model: models.User,
            attributes: ['username']
        }],
    })
    .then(post => {
        if (post.length !==null) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ error: 'No post found' })
        }
    })
    .catch(err => res.status(500).json(err))
}

function updateUserPost (req, res) {
    let id = token.getUserId(req)
    let postId = req.params.postid

    models.User.findOne({
        attributes: ['id', 'email', 'username', 'isAdmin'],
        where: { id }
    })
        .then(user => {
            models.Post.findOne({
              where: { id: postId },
            }).then((post) => {
             
              if (req.file) {
                post
                  .update({
                    title: req.body.title,
                    content: req.body.content,
                    attachment: `${req.protocol}://${req.get('host')}/images/${
                      req.file.filename
                    }`,
                    where: { id: postId },
                  })
                  .then((post) => res.status(201).json({ post }))
                  .catch((err) =>
                    res.status(404).json({ err: 'No post found' })
                  );
              } else {
                post
                  .update({
                    title: req.body.title,
                    content: req.body.content,
                    attachment: '',
                    where: { id: postId },
                  })
                  .then((post) => res.status(200).json({ post }))
                  .catch((err) =>
                    res.status(404).json({ err: 'No post found' })
                  );
              }
            });
        })
        .catch(error => res.status(500).json(error));
};

function deletePost (req, res){
    let id = token.getUserId(req)
    let postId = req.params.postid
  
    models.User.findOne({
        attributes: ['id', 'email', 'username', 'isAdmin'],
        where: { id }
    })
        .then(user => { 
            models.Post.findOne({
            where: { id: postId }
            }) 
                .then((post) => {
                    const filename = post.attachment.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {     
                    models.Post.destroy({where:{id: postId }})
                        .then(() => res.status(200).json({ message: 'Post deleted !'}))
                        .catch(()=>res.status(500).json({ error: 'Post not deleted; please contact administrator' }))
                    })
                })
        })
        .catch(()=>res.status(404).json({err : 'User not found'}))
};

module.exports = {
    createUserPost,
    displayPost,
    displayPosts,
    updateUserPost,
    deletePost,
};