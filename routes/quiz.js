const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz')

/* GET home page. */
router.get('/', (req, res, next) => {

  const showForm = req.session.vote

  let sum = 0

  Quiz.find()
    .then((data) => {
      data.forEach((item) => {
        sum = sum + item.vote
      })
      res.render('quiz', { title: 'Quiz', data, showForm, sum });
    })
});

router.post('/', (req, res) => {

  const id = req.body.answer

  Quiz.findById({ _id: id })
    .then((data) => {
      data.vote += 1
      data.save()
        .then(() => {
          req.session.vote = 1
          res.redirect('/quiz')
        })
    })
})

module.exports = router;
