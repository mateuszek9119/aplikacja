const express = require('express');
const router = express.Router();
const News = require('../models/news')

/* GET home page. */
router.get('/', (req, res) => {

  const search = req.query.search

  // find znajduje wszystkie dane , sort sortuje (domyslnie ma : 1 od daty najstarszej, -1 od najnowszej) 
  const newsFind = search ? News.find({ title: new RegExp(search.trim(), 'i') }).sort({ date: -1 }) : News.find().sort({ date: -1 })

  //exec funkcja pomocnicza find, findOne i innych, lepsza od callback, bo mozmy polaczyc kilka funkcji np: object.find().sort()
  newsFind.exec()
    .then(data => {
      res.render('news', { title: 'News', data, search })
    })
    .catch(err => console.log(err))
})


module.exports = router;
