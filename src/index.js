'use strict'

const fetch = typeof window === 'object' && window.fetch ? window.fetch : require('node-fetch')

const Id = require('peer-id')

module.exports = opt => {
  return function getId (load, cb) {
    if (typeof load === 'function') {
      cb = load
      load = true
    }
    fetch('http://localhost:' + opt.port + '/getId')
      .then(response => response.json(), cb)
      .then(data => {
        if (data.error) {
          return cb(new Error(data.error))
        }

        if (load) {
          Id.createFromJSON(data.id, cb)
        } else {
          cb(null, data.id)
        }
      }, cb)
  }
}
