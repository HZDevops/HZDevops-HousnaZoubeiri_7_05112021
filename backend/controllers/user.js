const bcrypt = require('bcrypt');
const models = require('../models');
const token = require('../utils/token');
const fs = require ('fs');
const { validEmail, validPassword, validUsername } = require('../utils/validate-input');
const { log } = require('console');

function signUp (req, res) {
    const { email, username, password, bio } = req.body;

    if (!email ||!username || !password) {
        return res.status(400).json({ error: 'Missing parameters' })
    }

   //Check user inputs
   if (
     validEmail(email) &&
     validPassword(password) &&
     validUsername(username)
   ) {
     models.User.findOne({
       attributes: ['email'],
       where: { email },
     })
       .then((user) => {
         if (!user) {
           bcrypt.hash(password, 10, function (err, bcryptPassword) {
             const newUser = models.User.create({
               email,
               username,
               password: bcryptPassword,
               bio,
               isAdmin: 0,
               avatar:''
             })
               .then((newUser) => res.status(201).json({ newUser }))
               .catch((err) =>
                 res.status(500).json({ err: 'Can not add user' })
               );
           });
         } else {
           return res.status(409).json({ error: 'User already exists! ' });
         }
       })
       .catch((err) => res.status(500).json({ err: 'Enable to verify user!' }));
   }
}


function signIn (req, res) {
    
 const { username, password } = req.body;

 if (!username || !password) {
   return res.status(400).json({ error: 'Missing parameters' });
 }
 models.User.findOne({
   where: { username },
 })
   .then((user) => {
     if (user) {
       bcrypt.compare(
         password,
         user.password,
         (errComparePassword, resComparePassword) => {
           if (resComparePassword) {
             res.status(200).json({
               user: user,
               token: token.getToken(user),
             });
           } else {
             res.status(403).json({ error: 'Invalid password' });
           }
         }
       );
     } else {
       res.status(404).json({ error: 'User not exist!' });
     }
   })
   .catch((err) => {
     res.status(500).json({ err: 'Unable to verify user' });
   });
};

function getUserProfil (req, res) {
    let id = token.getUserId(req)

    models.User.findOne({
        attributes: ['id', 'email', 'username','bio','photo'],
        where: { id }
    })
        .then(user => {
            if (user) {
                res.status(201).json(user)
            }else{
                res.status(404).json({err : 'User not found'})
            }
        })
        .catch(err => {res.status(500).json({err : 'Can not fetch user'}) })
};

function getMembers (req, res) {
    models.User.findAll({
      include: [
        {
          model: models.Post,
          attributes: ['id'],
        },
      ],
    })
      .then((found) => {
        res.status(200).json(found);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
};

function updateUserProfil (req, res) {
    let userId = token.getUserId(req)
    models.User.findOne({
        attributes: ['id', 'email', 'username','bio','photo'],
        where: { id: userId }
      })
      .then((user) => {
        if (req.file) {
          user
            .update({
              bio: req.body.bio,
              photo: `${req.protocol}://${req.get('host')}/images/${
                req.file.filename
              }`,
              where: { id: userId },
            })
            .then((newProfil) => res.status(201).json({ newProfil }))
            .catch((err) => res.status(404).json({ err: 'No profil found' }));
      } else {
          user
          .update({
            bio: req.body.bio,
            photo: '',
            where: { id: userId }
          })
          .then((newProfil) => res.status(201).json({ newProfil }))
          .catch((err) =>
            res.status(404).json({ err: 'No profil found' })
          );
      }
    })
    .catch(error => res.status(500).json(error));
       
};

function deleteUserProfil (req, res) {
    let userId = token.getUserId(req)
    if (userId) {
        models.User.findOne({
            where: { id: userId }
        })
            .then(user => {
                models.Post.destroy({
                            where: { UserId: user.id }
                        })
                        .then(() => {
                            models.User
                                .destroy({
                                    where: { id: user.id }
                                })
                                .then(() => res.status(201).json({message: 'User deleted!'}))
                                .catch(err => res.status(500).json(err))
                        })
            })
            .catch(err => res.status(401).json({ err: 'User not exist!' }))
    } else {
        res.status(500).json({ error: 'User not deleted; please contact administrator' })
    }
};


module.exports = {
    signUp,
    signIn,
    getUserProfil,
    getMembers,
    updateUserProfil,
    deleteUserProfil,
  };