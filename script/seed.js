if (process.env.NODE_ENV === 'development') require('../secrets');

const db = require('../server/db');

db.createNode('Character')
.then(charNode => {
  return db.setPropertiesOnNode(charNode, {name: 'Harry Potter'}, {test: true})
})
.then(updatedNode => {
  console.log(updatedNode)
})
.catch(console.error.bind(console))
