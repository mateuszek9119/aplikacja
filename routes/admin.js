const express = require('express');
const router = express.Router();
const News = require('../models/news')


router.all('*', (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("/login")

    return
  }

  next()
});


/* GET home page. */
router.get('/', (req, res, next) => {

  News.find()
    .then(data => {
      console.log(data)
      res.render('admin/index', { title: 'Admin', data });
    })
    .catch(err => console.log("Błąd wyszukiwania danych : ", err))

});

router.get('/news/add', (req, res) => {
  res.render('admin/news-form', { title: "dodaj news", body: {}, err: {} })
})

router.get('/news/delete/:id', (req, res) => {

  News.findByIdAndDelete(req.params.id)
    .then(() => {

      res.redirect('/admin')
    })
    .catch(err => console.log(err))

})


router.post('/news/add', (req, res) => {

  const body = req.body

  const newsData = new News(body)


  newsData.save()
    .then(() => {
      res.redirect('/admin')
    })
    .catch(function (err) {
      res.render('admin/news-form', { title: "dodaj news", err, body })
    })


})
module.exports = router;
