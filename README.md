# aegir-keycache

A module for aegir to speed up tests by caching keys

## Example

```js
'use strict'

const Server = require('./src/server')
const Client = require('./src')

/* const server = */ Server({file: './keycache.json', port: 5432}, (err, opt) => {
  if (err) throw err
  console.log('Server running at %s', opt.uri)
  const client = Client(opt)
  client(console.log)
})
```

### [ » Demo on asciinema ](https://asciinema.org/a/J5WR7lkFm0a5wyiebFZvIJuG3)
