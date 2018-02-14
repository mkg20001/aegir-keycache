'use strict'

const Hapi = require('hapi')
const fs = require('fs')
const debug = require('debug')
const log = debug('aegir-keycache')
const Id = require('peer-id')

class Storage {
  constructor (path) {
    this.path = path
    if (fs.existsSync(path)) this.content = JSON.parse(fs.readFileSync(path))
    else this.content = []
    this.index = -1
  }
  add (data) {
    this.content.push(data)
    this.save()
  }
  getOrGen (cb) {
    this.index++
    if (this.content[this.index]) return cb(null, this.content[this.index])
    else {
      Id.create((err, id) => {
        if (err) return cb(err)
        this.add(id.toJSON())
        cb(err, id.toJSON())
      })
    }
  }
  save () {
    fs.writeFileSync(this.path, Buffer.from(JSON.stringify(this.content)))
  }
}

module.exports = (opt, cb) => {
  const server = new Hapi.Server({ port: opt.port || 0, host: 'localhost', routes: { cors: true } })

  log('starting server on port %s', opt.port || 0)

  const store = new Storage(opt.file)

  server.route({
    method: 'GET',
    path: '/getId',
    handler: () => new Promise((resolve) => {
      store.getOrGen((err, id) => {
        if (err) console.error(err)
        if (err) return resolve({error: err.toString()})
        resolve({id})
      })
    })
  })

  server.start()
    .then(() => cb(null, server.info), cb)

  return server
}
