var express = require("express");
var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://postgres:""@postgres:5432/mcddb')
var router = express.Router();
 
router.get("/", function(req, res, next) {
    db.one('SELECT * from item')
      .then(function (data) {
        res.status(200).send(data)
      })
      .catch(function (error) {
          return next(error)
      })
});

module.exports = router;
