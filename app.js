const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const sassMiddleware = require('node-sass-middleware')
const exphbs = require('express-handlebars')
const configParser = require('./src/configParser')

const indexRouter = require('./src/routes/index')
const usersRouter = require('./src/routes/users')

const app = express()

const handlebarsConfig = configParser.loadFile('src/config/handlebarsConfig.json')

app.engine('.hbs', exphbs(handlebarsConfig))
app.set('view engine', '.hbs')
app.set('views', './src/views')

if(process.env.NODE_ENV !== 'test') app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  outputStyle: 'compressed',
  sourceMap: true
}))

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
