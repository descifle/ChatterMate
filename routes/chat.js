const router = require('express').Router()

const { Chat } = require('../models')

router.route('/message').post((req, res) => {
    res.send('this some bs')
    console.log(req.body)
    Chat.create({
        commenter: req.body.username,
        comment: req.body.message
    }).catch(err => {
        console.log(err)
        
    })
})

module.exports = router