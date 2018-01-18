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

const createNode = async (name, type) => {
  if (!allowedNodeTypes.includes(type)) {
    throw new Error(`Disallowed node type: ${type}`);
  }
  const session = driver.session();

  const results = await session.run(
    `
    CREATE
    (newNode:${type} {name: $name})
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
  // a string is fine-- converting to a number could result in overflow
  if (typeof nodeOrId1 === 'number') id1 = nodeOrId1;
  else id1 = nodeOrId1.identity.toString();
  if (typeof nodeOrId2 === 'number') id2 = nodeOrId2;
  else id2 = nodeOrId2.identity.toString();

  const session = driver.session();
  const results = await session.run(
    `
    MATCH (node1) WHERE ID(node1)=${id1}
    MATCH (node2) WHERE ID(node2)=${id2}
    CREATE
    (node1)-[newConnection:${type}]->(node2)
    RETURN newConnection
    `,
    {},
  );
  // uses built-in getter to get the record in a nicer format
  return results.records[0].get(0);
};
