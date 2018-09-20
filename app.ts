import * as createError from 'http-errors'
import * as Express from 'express'
import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'
import * as sassMiddleware from 'node-sass-middleware'
import * as exphbs from 'express-handlebars'

import { Application, Router } from "express"
import { ConfigParser } from "./src/ConfigParser"

const router: Router = require('./src/router')
const configParser: ConfigParser = new ConfigParser()
const app: Application = Express()

const PUBLIC_DIR = './public'

const handlebarsConfig = configParser.loadFile('config/handlebarsConfig.json')

app.engine('.hbs', exphbs(handlebarsConfig))
app.set('view engine', '.hbs')
app.set('views', './templates')

if (process.env.NODE_ENV !== 'test') app.use(logger('dev'))

app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(sassMiddleware({
  src: PUBLIC_DIR,
  dest: PUBLIC_DIR,
  indentedSyntax: true,
  outputStyle: 'compressed',
  sourceMap: true
}))

app.use(Express.static(PUBLIC_DIR))
app.use('/', router)

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
