const express = require('express')
const router = express.Router()
const ConfigParser = require('../ConfigParser')

const configParser = new ConfigParser('./config/')
const tvLinks = configParser.get('tvLinks')

router.get('/', (req, res, next) => res.render('pages/index', { title: 'home' }))
router.get('/tv', (req, res, next) => res.render('pages/tv', { title: 'TV' , tvLinks}))

module.exports = router
