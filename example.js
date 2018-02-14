'use strict'

const Server = require('./src/server')
const Client = require('./src')

/* const server = */ Server({file: './keycache.json', port: 5432}, (err, opt) => {
  if (err) throw err
  console.log('Server running at %s', opt.uri)
  const client = Client(opt)
  client(console.log)
})
