const router = require('express').Router()

const { User } = require('../models')

router.route('/results').get((req ,res) => {
    User.findOne({ where: {firstName: 'kiddy'}}).then((users) => {
        res.send(users)
    }).catch(err => console.log(err))
})

router.route('/create').post((req ,res) => {
    
    console.log(req.body.username)
    // res.send('success')
    User.findOne({ where: {userName: req.body.username}}).then((user) => {
        console.log(user)
        if(user === null) {
            User.create({
                userName: req.body.username,
                password: req.body.password,
            }).then(() => {
                res.send('All done')
            }).catch(err => console.log(err))
        } else {
            res.send('That user already exists')
        }
    })
    

    
})

router.route('/delete').get((req ,res) => {
    res.send('select')
})

module.exports = router