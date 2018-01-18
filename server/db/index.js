const neo4j = require('neo4j-driver').v1;

const uri = process.env.databaseURI
const user = process.env.databaseUser
const password = process.env.databasePassword

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const allowedNodeTypes = [
  'Fandom',
  'Character',
  'Tag',
  'Pairing',
  'Podfic',
  'Pairing_Type',
];
const allowedConnectionTypes = [
  'IS_SUBFANDOM_OF',
  'IS_CHARACTER_FROM',
  'IS_PART_OF_FANDOM',
  'CONTAINS_PAIRING_MEMBER',
  'PAIRING_OF_TYPE',
  'HAS_CHARACTER',
  'HAS_TAG',
  'HAS_PAIRING',
];

const createNode = async (type) => {
  if (!allowedNodeTypes.includes(type)) {
    throw new Error(`Disallowed node type: ${type}`);
  }
  const session = driver.session();

  const results = await session.run(
    `
    CREATE
    (newNode:${type})
    RETURN newNode
    `,
    { name },
  );
  // uses built-in getter to get the record in a nicer format
  return results.records[0].get(0);
};

const createConnection = async (nodeOrId1, type, nodeOrId2) => {
  if (!allowedConnectionTypes.includes(type)) {
    throw new Error(`Disallowed connection type: ${type}`);
  }
  let id1;
  let id2;
  // this will be used in string interpolation so having this num be
  // a string is fine-- converting to a number could result in overflow since neo4j allows larger numbers than javascipt
  if (typeof nodeOrId1 === 'number') id1 = nodeOrId1;
  else id1 = nodeOrId1.identity.toString();
  if (typeof nodeOrId2 === 'number') id2 = nodeOrId2;
  else id2 = nodeOrId2.identity.toString();

  const session = driver.session();
  const results = await session.run(
    `
    MATCH (node1) WHERE ID(node1)=$id1
    MATCH (node2) WHERE ID(node2)=$id2
    CREATE
    (node1)-[newConnection:${type}]->(node2)
    RETURN newConnection;
    `,
    {id1, id2},
  );
  // uses built-in getter to get the record in a nicer format
  return results.records[0].get(0);
};

const deleteNode = (nodeOrId, options) => {
  let id
  if (typeof nodeOrId === 'number') id = nodeOrId;
  //safer than toNumber since Neo4j numbers can be larger than JS numbers
  else id = nodeOrId.identity.toString();

  let force
  if (!options) force = false
  else force = options.force

  const session = driver.session();

  let query = `MATCH (n) WHERE ID(n)=${id} DELETE n;`
  if (force) { // add DETACH (deletes all connections if node is connected)
    query = `MATCH (n) WHERE ID(n)=${id} DETACH DELETE n;`
  }

  return session.run(query)
    .then(() => true)
    .catch((err) => {
      console.error(err)
      return false
    })
}

const deleteConnection = (connectionId) => {
  if (typeof connectionId !== 'number') connectionId = connectionId.identity.toString()

  const session = driver.session();
  let query = `MATCH [n] WHERE ID[n]=${connectionId} DELETE n;`
  return session.run(query)
  .then(() => true)
  .catch((err) => {
    console.error(err)
    return false
  })
}

//properties: {name: 'Harry Potter', gender: 'm', etc}
const setPropertiesOnNode = async (nodeOrId, properties) => {
  if (typeof nodeOrId !== 'number') nodeOrId = nodeOrId.identity.toString()


  let query = 'MATCH (n) WHERE ID(n) = $id, SET';
  const propsToPassToNeo = {}

  // build the query string
  // and an object of values to pass along to the built-in sanitizer
  properties.entries().forEach((keyValPair, i) => {
    query += ` n.$key${i} = $val${i},`; //ex: `n.$key1 = $val1`
    propsToPassToNeo[`key${i}`] = keyValPair[0];
    propsToPassToNeo[`val${i}`] = keyValPair[1];
  });

  //slice off the last comma and add "RETURN"
  if (query[query.length - 1] === ',') query = query.slice(0, query.length - 1);
  query += ' RETURN n';

  const session = driver.session();
  const results = await session.run(query)
  return results.records[0].get(0);

}

module.exports = {
  createNode,
  deleteNode,
  setPropertiesOnNode,
  createConnection,
  deleteConnection,
}
