import { Router } from "express"
import { ConfigParser } from './ConfigParser'

const express = require('express')
const router: Router = express.Router()

const configParser = new ConfigParser()
const tvLinks = configParser.loadFile('config/tvLinks.json')

router.get('/', (req, res) => res.render('pages/index', { title: 'home' }))
router.get('/tv', (req, res) => res.render('pages/tv', { title: 'TV', tvLinks }))

module.exports = router
