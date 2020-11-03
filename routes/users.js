const router = require('express').Router()

const { User } = require('../models')

router.route('/results').get((req ,res) => {
    User.findOne({ where: {firstName: 'kiddy'}}).then((users) => {
        res.send(users)
    }).catch(err => console.log(err))
})

router.route('/insert').get((req ,res) => {
    res.send('success')
    User.create({
        firstName: 'kiddy',
        age: 19,
    }).catch(err => console.log(err))
})

router.route('/delete').get((req ,res) => {
    res.send('select')
})

module.exports = router