const express = require('express');
const router = express.Router();
const News = require('../models/news')

/* GET home page. */
router.get('/', (req, res) => {

  const search = req.query.search
  let sort = Number(req.query.sort)

  if (sort !== -1 && sort !== 1) {
    sort = 1
  }

  // find znajduje wszystkie dane , sort sortuje (domyslnie ma : 1 od daty najstarszej, -1 od najnowszej) 
  const newsFind = search ? News.find({ title: new RegExp(search.trim(), 'i') }).sort({ date: sort }) : News.find().sort({ date: sort })

  //exec funkcja pomocnicza find, findOne i innych, lepsza od callback, bo mozmy polaczyc kilka funkcji np: object.find().sort()
  newsFind.exec()
    .then(data => {
      res.json(data)
    })
    .catch(err => console.log(err))
})


router.get('/:id', (req, res) => {

  const id = req.params.id

  const newsFind = News.findById(id).select('_id title description date')

  //exec funkcja pomocnicza find, findOne i innych, lepsza od callback, bo mozmy polaczyc kilka funkcji np: object.find().sort()
  newsFind.exec()
    .then(data => {
      res.json(data)
    })
    .catch(err => console.log(err))
})


module.exports = router;
