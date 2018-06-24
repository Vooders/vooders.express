const express = require('express')
const router = express.Router()

const configParser = require('../configParser')
const tvLinks = configParser.load('src/config/tvLinks.json')

router.get('/', (req, res, next) => res.render('pages/index', { title: 'home' }))
router.get('/tv', (req, res, next) => res.render('pages/tv', { title: 'TV' , tvLinks}))

module.exports = router
