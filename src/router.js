const express = require('express')
const router = express.Router()

const configParser = require('../src/configParser')
const tvLinks = configParser.loadFile('config/tvLinks.json')

router.get('/', (req, res, next) => res.render('pages/index', { title: 'home' }))
router.get('/tv', (req, res, next) => res.render('pages/tv', { title: 'TV', tvLinks }))

module.exports = router
