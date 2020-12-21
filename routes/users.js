const router = require('express').Router()
const passport = require('passport')

const { User } = require('../models')

// serverside verification
const isLoggedIn = (req, res, next) => {
    if(req.user) {
        next()
    } else {
        res.sendStatus(401)
    }
}

// router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res) => {
//     console.log(req.user)
// })

// Google Auth Routes
router.route('/auth/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res) => {
    console.log('heyo')
})

router.route('/auth/callback').get(passport.authenticate('google', { scope: ['profile', 'email'],failureRedirect: '/login' }), (req, res) => {
    res.redirect('/')
    // const user = {
    //     userName: req.user.displayName
    // }
    // res.send(user)
})

router.route('/logout', (req, res) => {
    res.session = null
    res.logout()
    res.redirect('/')
})


router.route('/good').get((req,res) => {
    res.send(`Welcome ${req.user.displayName}`)
})

router.route('/failed').get((req, res) => {
    res.send('you failed to login')
})

//Regular Degular Routes
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