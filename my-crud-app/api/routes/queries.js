var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://postgres:""@postgres:5432/mydb')

const getUsers = (req, res) => {
  db.any('SELECT * from testtable')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const createUser = (req, res) => {
  const { id, first, last, email, phone, hobby } = req.body
  db.any('INSERT into testtable (id, first, last, email, phone, hobby) VALUES ($1, $2, $3, $4, $5, $6)',[id, first, last, email, phone, hobby])
  .then(items => {
    res.status(201).send('User added')
  })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  const {first, last, email, phone, hobby } = req.body
  db.any('UPDATE testtable SET first = $1, last = $2, email = $3, phone = $4, hobby = $5 WHERE id = $6',[first, last, email, phone, hobby, id])
  .then(items => {
    res.status(201).send('User Modified')
  })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id)
  db.any('SELECT * from testtable where id = $1',[id])
  .then(items => {
    res.status(200).json(items)
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)
  db.any('DELETE FROM testtable WHERE id = $1', [id])
  .then(items => {
    res.status(201).send('User Deleted')
  })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  getUserById,
  deleteUser,
}